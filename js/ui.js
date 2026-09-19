const UI = {
    currentRoute: 'dashboard',
    currentQuoteSymbol: null,
    tradeDraft: null,

    formatCurrency: (value, options = {}) => {
        const amount = Number(value) || 0;
        const sign = amount < 0 ? '-' : options.showPlus && amount > 0 ? '+' : '';
        const abs = Math.abs(amount);
        return `${sign}$${abs.toLocaleString('en-US', {
            minimumFractionDigits: options.minimumFractionDigits ?? 2,
            maximumFractionDigits: options.maximumFractionDigits ?? 2
        })}`;
    },

    formatNumber: (value, maximumFractionDigits = 2) => {
        return (Number(value) || 0).toLocaleString('en-US', { maximumFractionDigits });
    },

    formatPercent: (value, options = {}) => {
        const amount = Number(value) || 0;
        const sign = options.showPlus && amount > 0 ? '+' : '';
        return `${sign}${amount.toFixed(options.decimals ?? 2)}%`;
    },

    escapeHTML: value => String(value ?? '').replace(/[&<>'"]/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char])),

    animateNetWorth: (el, target) => {
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = UI.formatCurrency(target);
            return;
        }
        const duration = 900;
        const start = performance.now();
        const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = UI.formatCurrency(target * eased, { maximumFractionDigits: 0 });
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = UI.formatCurrency(target);
        };
        requestAnimationFrame(tick);
    },

    toast: (message) => {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.remove('hidden');
        requestAnimationFrame(() => toast.classList.add('show'));
        clearTimeout(UI._toastTimer);
        UI._toastTimer = setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 200);
        }, 2800);
    },

    updateNavVisibility: () => {
        document.getElementById('bottom-nav')?.classList.toggle('hidden', !Auth.isAuthenticated);
        document.getElementById('login-screen')?.classList.toggle('hidden', Auth.isAuthenticated);
    },

    navigate: (route) => {
        if (!Auth.isAuthenticated && route !== 'dashboard') return;
        UI.currentRoute = route;
        UI.currentQuoteSymbol = null;
        UI.updateActiveNav();

        switch (route) {
            case 'dashboard': UI.renderDashboard(); break;
            case 'positions': UI.renderPositions(); break;
            case 'trade': UI.renderTrade(); break;
            case 'transfers': UI.renderTransfers(); break;
            case 'markets': UI.renderMarkets(); break;
            default: UI.renderDashboard();
        }

        document.getElementById('main-view')?.scrollTo({ top: 0, behavior: 'instant' });
    },

    updateActiveNav: () => {
        document.querySelectorAll('.nav-item').forEach(button => {
            button.classList.toggle('active', button.dataset.route === UI.currentRoute);
        });
    },

    refreshCurrentView: () => {
        if (!Auth.isAuthenticated) return;
        switch (UI.currentRoute) {
            case 'dashboard': UI.renderDashboard(false); break;
            case 'positions': UI.renderPositions(false); break;
            case 'trade': UI.renderTrade(false); break;
            case 'markets': UI.renderMarkets(false); break;
            case 'quote': UI.renderQuote(UI.currentQuoteSymbol, false); break;
            default: break;
        }
    },

    renderDashboard: (animate = true) => {
        const netWorth = API.getNetWorth();
        const cash = API.getCash('brokerage');
        const dayGain = API.getDayGain();
        const dayGainPct = netWorth > 0 ? (dayGain / Math.max(netWorth - dayGain, 1)) * 100 : 0;
        const history = API.state.portfolioHistory || [];
        const chart = UI.renderPortfolioChart(history);
        const accountCards = API.state.accounts.map(account => {
            const value = API.getAccountValue(account.id);
            const holdingsValue = account.id === 'brokerage' ? API.getHoldingsValue() : 0;
            return `
                <button class="card account-card" data-account="${UI.escapeHTML(account.id)}">
                    <div class="card-topline">
                        <h3>${UI.escapeHTML(account.name)}</h3>
                        <span class="account-number">${UI.escapeHTML(account.num)}</span>
                    </div>
                    <span class="card-chevron" aria-hidden="true">›</span>
                    <div class="balance">${UI.formatCurrency(value)}</div>
                    <div class="sub">Available Cash: ${UI.formatCurrency(account.cash)}</div>
                    ${account.id === 'brokerage' ? `<div class="account-meta">Invested: ${UI.formatCurrency(holdingsValue)}</div>` : ''}
                </button>
            `;
        }).join('');

        const template = `
            <section class="dashboard-page ${animate ? 'page-enter' : ''}">
                <header class="dashboard-hero">
                    <div class="hero-topline">
                        <div>
                            <span class="eyebrow">Portfolio</span>
                            <h1>Total Net Worth</h1>
                        </div>
                        <div class="hero-side">
                            <span class="market-pill ${API.isMarketOpen() ? 'market-open' : 'market-closed'}">${API.isMarketOpen() ? 'Market open' : 'Market closed'}</span>
                            <button class="icon-button hero-action" data-action="reset" aria-label="Reset simulator">↺</button>
                        </div>
                    </div>
                    <div class="net-worth" id="net-worth-value">${UI.formatCurrency(netWorth)}</div>
                    <div class="gain-line ${dayGain >= 0 ? 'gain-positive' : 'gain-negative'}">
                        ${UI.formatCurrency(dayGain, { showPlus: true })} (${UI.formatPercent(dayGainPct, { showPlus: true })}) Today
                    </div>
                    <div class="portfolio-chart" aria-label="Portfolio value history">${chart}</div>
                </header>

                <div class="content-shell">
                    <div class="section-heading">
                        <div>
                            <span class="eyebrow">Your accounts</span>
                            <h2>Accounts</h2>
                        </div>
                        <span class="section-value">Cash ${UI.formatCurrency(API.state.accounts.reduce((sum, account) => sum + account.cash, 0))}</span>
                    </div>
                    <div class="account-stack">${accountCards}</div>

                    <div class="quick-actions">
                        <button class="quick-action" data-action="positions">
                            <span class="quick-icon">▦</span>
                            <span>Positions</span>
                        </button>
                        <button class="quick-action" data-action="trade">
                            <span class="quick-icon">＋</span>
                            <span>Trade</span>
                        </button>
                        <button class="quick-action" data-action="markets">
                            <span class="quick-icon">↗</span>
                            <span>Markets</span>
                        </button>
                    </div>
                </div>
            </section>
        `;
        document.getElementById('main-view').innerHTML = template;
        if (animate) UI.animateNetWorth(document.getElementById('net-worth-value'), netWorth);
        UI.bindDashboardEvents();
    },

    bindDashboardEvents: () => {
        document.querySelectorAll('.account-card').forEach(card => {
            card.addEventListener('click', () => {
                API.state.selectedAccountId = card.dataset.account || 'brokerage';
                API.save();
                if (API.state.selectedAccountId === 'brokerage') UI.navigate('positions');
                else UI.toast('This account is view-only in the local simulator.');
            });
        });

        document.querySelectorAll('[data-action="positions"]').forEach(button => button.addEventListener('click', () => UI.navigate('positions')));
        document.querySelectorAll('[data-action="trade"]').forEach(button => button.addEventListener('click', () => UI.navigate('trade')));
        document.querySelectorAll('[data-action="markets"]').forEach(button => button.addEventListener('click', () => UI.navigate('markets')));
        document.querySelectorAll('[data-action="reset"]').forEach(button => button.addEventListener('click', () => {
            const confirmed = window.confirm('Reset the local investing simulator to its original portfolio?');
            if (confirmed) API.reset();
        }));
    },

    renderPortfolioChart: (history) => {
        const width = 720;
        const height = 180;
        const paddingX = 12;
        const paddingY = 16;
        const values = history.length ? history.map(point => Number(point.value)) : [API.getNetWorth()];
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = Math.max(max - min, 1);
        const points = values.map((value, index) => {
            const x = paddingX + (index / Math.max(values.length - 1, 1)) * (width - paddingX * 2);
            const y = height - paddingY - ((value - min) / range) * (height - paddingY * 2);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        });

        const finalPoint = points[points.length - 1].split(',');
        const path = `M ${points.join(' L ')}`;
        const fillPath = `${path} L ${finalPoint[0]},${height} L ${points[0].split(',')[0]},${height} Z`;
        return `
            <svg viewBox="0 0 ${width} ${height}" role="img" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="portfolioFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-opacity="0.28" />
                        <stop offset="100%" stop-opacity="0" />
                    </linearGradient>
                </defs>
                <path class="chart-fill" d="${fillPath}" />
                <path class="chart-line" pathLength="1" d="${path}" />
                <circle class="chart-dot" cx="${finalPoint[0]}" cy="${finalPoint[1]}" r="4" />
            </svg>
        `;
    },

    renderPositions: (animate = true) => {
        const brokerage = API.getBrokerageAccount();
        const holdingsValue = API.getHoldingsValue();
        const accountValue = (brokerage?.cash || 0) + holdingsValue;
        const dayGain = API.getDayGain();
        const totalGain = API.getTotalGain();

        const rows = API.state.positions.length
            ? API.state.positions.map(position => {
                const marketValue = position.shares * position.price;
                const dayChange = position.price - position.prevClose;
                const dayChangeDollars = position.shares * dayChange;
                const totalGainDollars = position.shares * (position.price - position.costBasis);
                const dayPct = position.prevClose ? (dayChange / position.prevClose) * 100 : 0;
                return `
                    <button class="position-row" data-symbol="${UI.escapeHTML(position.sym)}">
                        <div class="position-main">
                            <div class="symbol-line"><span class="sym">${UI.escapeHTML(position.sym)}</span><span class="shares-pill">${UI.formatNumber(position.shares, 0)} sh</span></div>
                            <div class="desc">${UI.escapeHTML(position.desc)}</div>
                            <div class="sub">Avg cost ${UI.formatCurrency(position.costBasis)}</div>
                        </div>
                        <div class="position-right">
                            <div class="val">${UI.formatCurrency(marketValue)}</div>
                            <div class="pl ${dayChangeDollars >= 0 ? 'gain-positive' : 'gain-negative'}">${UI.formatCurrency(dayChangeDollars, { showPlus: true })} (${UI.formatPercent(dayPct, { showPlus: true })})</div>
                            <div class="pl muted ${totalGainDollars >= 0 ? 'gain-positive' : 'gain-negative'}">Total ${UI.formatCurrency(totalGainDollars, { showPlus: true })}</div>
                        </div>
                    </button>
                `;
            }).join('')
            : `<div class="empty-state"><h3>No positions</h3><p>Buy a stock in the simulator to create your first position.</p></div>`;

        document.getElementById('main-view').innerHTML = `
            <section class="page ${animate ? 'page-enter' : ''}">
                <header class="sticky-page-header">
                    <div>
                        <span class="eyebrow">Brokerage</span>
                        <h2>Positions</h2>
                    </div>
                    <button class="header-link" data-action="trade">Trade</button>
                </header>

                <div class="metric-strip">
                    <div><span>Account Value</span><strong>${UI.formatCurrency(accountValue)}</strong></div>
                    <div><span>Day Gain</span><strong class="${dayGain >= 0 ? 'gain-positive' : 'gain-negative'}">${UI.formatCurrency(dayGain, { showPlus: true })}</strong></div>
                    <div><span>Total Gain</span><strong class="${totalGain >= 0 ? 'gain-positive' : 'gain-negative'}">${UI.formatCurrency(totalGain, { showPlus: true })}</strong></div>
                </div>

                <div class="content-shell no-top-padding">
                    <div class="list-heading">
                        <span>${API.state.positions.length} Holdings</span>
                        <span>${UI.formatCurrency(holdingsValue)}</span>
                    </div>
                    <div class="position-list">${rows}</div>
                </div>
            </section>
        `;

        document.querySelectorAll('.position-row').forEach(row => {
            row.addEventListener('click', () => UI.renderQuote(row.dataset.symbol));
        });
        document.querySelector('[data-action="trade"]')?.addEventListener('click', () => UI.navigate('trade'));
    },

    renderQuote: (sym, animate = true) => {
        const symbol = String(sym || '').toUpperCase();
        const quote = API.getQuote(symbol);
        if (!quote) {
            UI.toast(`No quote is available for ${symbol}.`);
            return;
        }
        UI.currentRoute = 'quote';
        UI.currentQuoteSymbol = symbol;
        UI.updateActiveNav();

        const change = quote.price - quote.prevClose;
        const changePct = quote.prevClose ? (change / quote.prevClose) * 100 : 0;
        const position = API.getPosition(symbol);

        document.getElementById('main-view').innerHTML = `
            <section class="page ${animate ? 'page-enter' : ''}">
                <header class="sticky-page-header quote-header">
                    <button class="back-button" data-action="back">‹</button>
                    <div class="quote-heading">
                        <span class="eyebrow">Quote</span>
                        <h2>${UI.escapeHTML(symbol)}</h2>
                    </div>
                    <button class="header-link" data-action="trade">Trade</button>
                </header>

                <div class="content-shell">
                    <div class="quote-hero">
                        <div class="desc">${UI.escapeHTML(quote.desc || symbol)}</div>
                        <div class="quote-price">${UI.formatCurrency(quote.price)}</div>
                        <div class="quote-change ${change >= 0 ? 'gain-positive' : 'gain-negative'}">${UI.formatCurrency(change, { showPlus: true })} (${UI.formatPercent(changePct, { showPlus: true })}) Today</div>
                    </div>

                    <div class="quote-grid">
                        <div><span>Bid</span><strong>${UI.formatCurrency(quote.price - 0.02)}</strong></div>
                        <div><span>Ask</span><strong>${UI.formatCurrency(quote.price + 0.02)}</strong></div>
                        <div><span>Day High</span><strong>${UI.formatCurrency(quote.price + 1.50)}</strong></div>
                        <div><span>Day Low</span><strong>${UI.formatCurrency(Math.max(0.01, quote.price - 1.50))}</strong></div>
                    </div>

                    ${position ? `
                        <div class="info-card">
                            <div><span>Shares Owned</span><strong>${UI.formatNumber(position.shares, 0)}</strong></div>
                            <div><span>Market Value</span><strong>${UI.formatCurrency(position.shares * position.price)}</strong></div>
                        </div>
                    ` : ''}

                    <button class="primary-button" data-action="trade">Trade ${UI.escapeHTML(symbol)}</button>
                </div>
            </section>
        `;

        document.querySelectorAll('[data-action="back"]').forEach(button => button.addEventListener('click', () => UI.navigate(position ? 'positions' : 'markets')));
        document.querySelectorAll('[data-action="trade"]').forEach(button => button.addEventListener('click', () => {
            UI.tradeDraft = { symbol, side: position ? 'BUY' : 'BUY', quantity: 1 };
            UI.navigate('trade');
            setTimeout(() => {
                const symbolInput = document.getElementById('trade-symbol');
                if (symbolInput) {
                    symbolInput.value = symbol;
                    symbolInput.dispatchEvent(new Event('input'));
                }
            }, 0);
        }));
    },

    renderTrade: (animate = true) => {
        const defaultSymbol = UI.tradeDraft?.symbol || API.state.watchlists?.[0]?.items?.[0] || 'AAPL';
        const defaultSide = UI.tradeDraft?.side || 'BUY';
        const defaultQty = UI.tradeDraft?.quantity || 1;
        const symbol = UI.escapeHTML(defaultSymbol);
        const quote = API.getQuote(defaultSymbol);
        const priceText = quote ? UI.formatCurrency(quote.price) : '—';
        const buyingPower = API.getCash('brokerage');

        document.getElementById('main-view').innerHTML = `
            <section class="page ${animate ? 'page-enter' : ''}">
                <header class="sticky-page-header">
                    <div>
                        <span class="eyebrow">Brokerage</span>
                        <h2>Trade</h2>
                    </div>
                    <span class="market-pill ${API.isMarketOpen() ? 'market-open' : 'market-closed'}">${API.isMarketOpen() ? 'Market open' : 'Market closed'}</span>
                </header>

                <div class="content-shell trade-shell">
                    <div class="segmented-control" id="trade-side">
                        <button class="segment ${defaultSide === 'BUY' ? 'selected' : ''}" data-side="BUY">Buy</button>
                        <button class="segment ${defaultSide === 'SELL' ? 'selected' : ''}" data-side="SELL">Sell</button>
                    </div>

                    <div class="trade-quote-card">
                        <div>
                            <span class="eyebrow">Symbol</span>
                            <input id="trade-symbol" class="symbol-input" type="text" value="${symbol}" maxlength="5" autocapitalize="characters" autocomplete="off" spellcheck="false" />
                        </div>
                        <div class="trade-price-block">
                            <span>Last price</span>
                            <strong id="trade-last-price">${priceText}</strong>
                        </div>
                    </div>

                    <div class="trade-form-card">
                        <label class="field-label" for="trade-quantity">Quantity</label>
                        <input id="trade-quantity" class="large-input" type="number" min="1" step="1" value="${defaultQty}" inputmode="numeric" />

                        <label class="field-label" for="trade-order-type">Order type</label>
                        <select id="trade-order-type" class="large-input"><option>Market</option></select>

                        <div class="trade-summary">
                            <div><span>Buying power</span><strong id="trade-buying-power">${UI.formatCurrency(buyingPower)}</strong></div>
                            <div><span>Estimated value</span><strong id="trade-estimated-value">${quote ? UI.formatCurrency(quote.price * defaultQty) : '—'}</strong></div>
                        </div>

                        <button id="preview-order" class="primary-button">Preview Order</button>
                    </div>

                    <div class="local-state-note"><strong>Local simulator</strong><span>Orders and portfolio changes are stored on this device.</span></div>
                </div>
            </section>
        `;

        const sideButtons = document.querySelectorAll('#trade-side .segment');
        let side = defaultSide;
        let currentQuote = quote;

        const update = () => {
            const symbolValue = document.getElementById('trade-symbol').value.trim().toUpperCase();
            currentQuote = API.getQuote(symbolValue);
            const quantity = Math.max(1, Math.floor(Number(document.getElementById('trade-quantity').value) || 1));
            document.getElementById('trade-quantity').value = quantity;
            document.getElementById('trade-last-price').textContent = currentQuote ? UI.formatCurrency(currentQuote.price) : '—';
            document.getElementById('trade-estimated-value').textContent = currentQuote ? UI.formatCurrency(currentQuote.price * quantity) : '—';
            sideButtons.forEach(button => button.classList.toggle('selected', button.dataset.side === side));
        };

        sideButtons.forEach(button => button.addEventListener('click', () => {
            side = button.dataset.side;
            update();
        }));

        document.getElementById('trade-symbol').addEventListener('input', update);
        document.getElementById('trade-quantity').addEventListener('input', update);
        document.getElementById('preview-order').addEventListener('click', () => {
            const symbolValue = document.getElementById('trade-symbol').value.trim().toUpperCase();
            const quantity = Math.floor(Number(document.getElementById('trade-quantity').value) || 0);
            if (!/^[A-Z.]{1,5}$/.test(symbolValue)) {
                UI.toast('Enter a valid stock symbol.');
                return;
            }
            if (quantity < 1) {
                UI.toast('Enter a quantity of at least 1 share.');
                return;
            }
            if (!currentQuote) {
                UI.toast(`${symbolValue} is not available in this simulator yet.`);
                return;
            }

            UI.tradeDraft = {
                symbol: symbolValue,
                side,
                quantity,
                price: currentQuote.price
            };
            UI.renderTradePreview();
        });

        update();
    },

    renderTradePreview: () => {
        const draft = UI.tradeDraft;
        const quote = API.getQuote(draft?.symbol);
        if (!draft || !quote) return UI.renderTrade();
        draft.price = quote.price;

        const account = API.getBrokerageAccount();
        const orderValue = draft.quantity * draft.price;
        const projectedCash = draft.side === 'BUY' ? account.cash - orderValue : account.cash + orderValue;
        const position = API.getPosition(draft.symbol);
        const projectedShares = (position?.shares || 0) + (draft.side === 'BUY' ? draft.quantity : -draft.quantity);

        document.getElementById('main-view').innerHTML = `
            <section class="page page-enter">
                <header class="sticky-page-header">
                    <button class="back-button" id="preview-back">‹</button>
                    <div>
                        <span class="eyebrow">Order review</span>
                        <h2>Preview Order</h2>
                    </div>
                    <span></span>
                </header>

                <div class="content-shell">
                    <div class="order-card">
                        <div class="order-direction ${draft.side === 'BUY' ? 'order-buy' : 'order-sell'}">${draft.side}</div>
                        <div class="order-title">${draft.quantity} share${draft.quantity === 1 ? '' : 's'} of ${UI.escapeHTML(draft.symbol)}</div>
                        <div class="order-price">${UI.formatCurrency(draft.price)} estimated execution</div>
                    </div>

                    <div class="details-card">
                        <div><span>Estimated total</span><strong>${UI.formatCurrency(orderValue)}</strong></div>
                        <div><span>Cash before order</span><strong>${UI.formatCurrency(account.cash)}</strong></div>
                        <div><span>Cash after order</span><strong class="${projectedCash >= 0 ? '' : 'gain-negative'}">${UI.formatCurrency(projectedCash)}</strong></div>
                        <div><span>Shares after order</span><strong class="${projectedShares >= 0 ? '' : 'gain-negative'}">${UI.formatNumber(projectedShares, 0)}</strong></div>
                    </div>

                    <div class="notice-card">This simulator executes trades instantly at the displayed simulated market price and stores the result locally.</div>

                    <button id="confirm-order" class="primary-button">Confirm ${draft.side === 'BUY' ? 'Buy' : 'Sell'}</button>
                </div>
            </section>
        `;

        document.getElementById('preview-back').addEventListener('click', () => UI.renderTrade());
        document.getElementById('confirm-order').addEventListener('click', UI.executeTrade);
    },

    executeTrade: () => {
        const draft = UI.tradeDraft;
        const quote = API.getQuote(draft?.symbol);
        const account = API.getBrokerageAccount();
        if (!draft || !quote || !account) return;

        const executionPrice = quote.price;
        const total = Number((draft.quantity * executionPrice).toFixed(2));
        const position = API.getPosition(draft.symbol);

        if (draft.side === 'BUY') {
            if (account.cash < total) {
                UI.toast('Insufficient buying power for this order.');
                return;
            }

            account.cash = Number((account.cash - total).toFixed(2));
            if (position) {
                const existingCost = position.shares * position.costBasis;
                position.shares += draft.quantity;
                position.costBasis = Number(((existingCost + total) / position.shares).toFixed(4));
                position.price = executionPrice;
                position.prevClose = quote.prevClose;
            } else {
                API.state.positions.push({
                    sym: draft.symbol,
                    desc: quote.desc || draft.symbol,
                    shares: draft.quantity,
                    price: executionPrice,
                    prevClose: quote.prevClose || executionPrice,
                    costBasis: executionPrice
                });
            }
        } else {
            if (!position || position.shares < draft.quantity) {
                UI.toast(`You do not own enough ${draft.symbol} shares to sell.`);
                return;
            }

            account.cash = Number((account.cash + total).toFixed(2));
            position.shares -= draft.quantity;
            position.price = executionPrice;
            position.prevClose = quote.prevClose;
            if (position.shares === 0) {
                API.state.positions = API.state.positions.filter(item => item.sym !== draft.symbol);
            }
        }

        const transaction = {
            id: `txn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            timestamp: Date.now(),
            accountId: account.id,
            symbol: draft.symbol,
            side: draft.side,
            quantity: draft.quantity,
            price: executionPrice,
            total
        };

        API.state.transactions.unshift(transaction);
        API.state.orders.unshift({ ...transaction, status: 'FILLED' });
        API.state.portfolioHistory.push({ timestamp: Date.now(), value: Number(API.getNetWorth().toFixed(2)) });
        API.save();

        UI.tradeDraft = null;
        UI.navigate('positions');
        UI.toast(`${draft.side === 'BUY' ? 'Bought' : 'Sold'} ${draft.quantity} ${draft.symbol} share${draft.quantity === 1 ? '' : 's'}.`);
    },

    renderTransfers: (animate = true) => {
        document.getElementById('main-view').innerHTML = `
            <section class="page ${animate ? 'page-enter' : ''}">
                <header class="sticky-page-header">
                    <div><span class="eyebrow">Money movement</span><h2>Move Money</h2></div>
                </header>
                <div class="content-shell">
                    <div class="empty-state spacious">
                        <div class="empty-icon">$</div>
                        <h3>Transfer tools</h3>
                        <p>Phase 1–2 keeps money movement intentionally separate from the portfolio engine. Your brokerage cash balance is fully persisted and ready for the trading simulator.</p>
                        <button class="secondary-button" data-action="positions">View brokerage positions</button>
                    </div>
                </div>
            </section>
        `;
        document.querySelector('[data-action="positions"]')?.addEventListener('click', () => UI.navigate('positions'));
    },

    renderMarkets: (animate = true) => {
        const items = API.state.watchlists?.[0]?.items || [];
        const rows = items.map(symbol => {
            const quote = API.getQuote(symbol);
            if (!quote) return '';
            const change = quote.price - quote.prevClose;
            const pct = quote.prevClose ? (change / quote.prevClose) * 100 : 0;
            return `
                <button class="position-row watchlist-row" data-symbol="${UI.escapeHTML(symbol)}">
                    <div class="position-main"><div class="sym">${UI.escapeHTML(symbol)}</div><div class="desc">${UI.escapeHTML(quote.desc || symbol)}</div></div>
                    <div class="position-right"><div class="val">${UI.formatCurrency(quote.price)}</div><div class="pl ${change >= 0 ? 'gain-positive' : 'gain-negative'}">${UI.formatCurrency(change, { showPlus: true })} (${UI.formatPercent(pct, { showPlus: true })})</div></div>
                </button>
            `;
        }).join('');

        document.getElementById('main-view').innerHTML = `
            <section class="page ${animate ? 'page-enter' : ''}">
                <header class="sticky-page-header">
                    <div><span class="eyebrow">Market monitor</span><h2>Markets</h2></div>
                </header>
                <div class="market-summary-grid">
                    <div><span>S&amp;P 500</span><strong>5,250.00</strong><small class="gain-positive">+0.5%</small></div>
                    <div><span>Nasdaq</span><strong>16,300.00</strong><small class="gain-positive">+0.8%</small></div>
                    <div><span>Dow</span><strong>39,200.00</strong><small class="gain-negative">-0.1%</small></div>
                </div>
                <div class="content-shell no-top-padding">
                    <div class="section-heading compact"><div><span class="eyebrow">Saved list</span><h3>My Watchlist</h3></div><button class="header-link" data-action="positions">Positions</button></div>
                    <div class="position-list">${rows || `<div class="empty-state"><h3>Watchlist is empty</h3><p>Add symbols to API.state.watchlists to populate it.</p></div>`}</div>
                </div>
            </section>
        `;
        document.querySelectorAll('.watchlist-row').forEach(row => row.addEventListener('click', () => UI.renderQuote(row.dataset.symbol)));
        document.querySelector('[data-action="positions"]')?.addEventListener('click', () => UI.navigate('positions'));
    }
};
