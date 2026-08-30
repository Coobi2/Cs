const UI = {
    currentRoute: 'dashboard',

    toast: (msg) => {
        const t = document.getElementById('toast');
        t.innerText = msg;
        t.classList.remove('hidden');
        t.classList.add('show');
        setTimeout(() => { 
            t.classList.remove('show'); 
            t.classList.add('hidden'); 
        }, 3000);
    },

    navigate: (route) => {
        UI.currentRoute = route;
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        document.querySelector(`.nav-item[data-route="${route}"]`)?.classList.add('active');

        const main = document.getElementById('main-view');
        main.innerHTML = '';
        
        switch(route) {
            case 'dashboard': UI.renderDashboard(); break;
            case 'positions': UI.renderPositions(); break;
            case 'trade': UI.renderTrade(); break;
            case 'transfers': UI.renderTransfers(); break;
            case 'markets': UI.renderMarkets(); break;
        }
    },

    renderDashboard: () => {
        const totalCash = API.state.accounts.reduce((s, a) => s + a.cash, 0);
        const totalVal = API.state.accounts.reduce((s, a) => s + a.value, 0);
        
        const html = `
            <div class="screen">
                <div class="header">
                    <h1>Total Net Worth</h1>
                    <div class="net-worth">$${totalVal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    <div class="gain">+$1,234.56 (+0.32%) Today</div>
                    <svg width="100%" height="60" viewBox="0 0 300 60" style="margin-top:15px;">
                        <path d="M0,40 L50,38 L100,45 L150,30 L200,25 L250,35 L300,20" stroke="rgba(255,255,255,0.8)" fill="none" stroke-width="2"/>
                    </svg>
                </div>
                
                <div class="card" onclick="UI.navigate('positions')">
                    <h3>Brokerage <span style="float:right; font-size:12px; color:var(--text-secondary)">****1234</span></h3>
                    <div class="balance">$312,000.00</div>
                    <div class="sub">Available Cash: $10,420.55</div>
                </div>

                <div class="card" onclick="UI.navigate('positions')">
                    <h3>Roth IRA <span style="float:right; font-size:12px; color:var(--text-secondary)">****5678</span></h3>
                    <div class="balance">$250,000.00</div>
                    <div class="sub">Available Cash: $0.00</div>
                </div>

                <div class="card" onclick="UI.navigate('transfers')">
                    <h3>Checking <span style="float:right; font-size:12px; color:var(--text-secondary)">****9012</span></h3>
                    <div class="balance">$60,000.00</div>
                    <div class="sub">Available Cash: $60,000.00</div>
                </div>
            </div>
        `;
        document.getElementById('main-view').innerHTML = html;
    },

    renderPositions: () => {
        let posHtml = `
            <div class="title-bar">
                <h2>Positions</h2>
                <span style="color:var(--schwab-blue); font-weight:600;">Filter</span>
            </div>
            <div class="mkt-idx-bar">
                <div class="idx"><span>Account Value</span><div class="val">$562,000.00</div></div>
                <div class="idx"><span>Day Gain</span><div class="val up">+$1,234.00</div></div>
                <div class="idx"><span>Total Gain</span><div class="val up">+$42,000.00</div></div>
            </div>
        `;

        API.state.positions.forEach(p => {
            const mv = (p.shares * p.price).toFixed(2);
            const dayChange = (p.price - p.prevClose).toFixed(2);
            const totalGain = ((p.price - p.costBasis) * p.shares).toFixed(2);
            const dayClass = dayChange >= 0 ? 'green' : 'red';
            const totalClass = totalGain >= 0 ? 'green' : 'red';

            posHtml += `
                <div class="position-row" onclick="UI.renderQuote('${p.sym}')">
                    <div>
                        <div class="sym">${p.sym}</div>
                        <div class="desc">${p.desc}</div>
                        <div class="sub" style="font-size:11px; margin-top:4px;">${p.shares} sh</div>
                    </div>
                    <div class="right">
                        <div class="val">$${mv}</div>
                        <div class="pl ${dayClass}">${dayChange >= 0 ? '+' : ''}${dayChange} (${((dayChange/p.prevClose)*100).toFixed(2)}%)</div>
                        <div class="pl ${totalClass}">Total: ${totalGain >= 0 ? '+' : ''}$${totalGain}</div>
                    </div>
                </div>
            `;
        });

        document.getElementById('main-view').innerHTML = posHtml;
    },

    renderQuote: (sym) => {
        const p = API.state.positions.find(x => x.sym === sym);
        if(!p) return;
        
        const html = `
            <div class="title-bar">
                <span style="font-size:24px; cursor:pointer;" onclick="UI.renderPositions()">‹</span>
                <h2>${p.sym}</h2>
                <span></span>
            </div>
            <div class="screen">
                <div style="text-align:center; margin-bottom:20px;">
                    <h3>${p.desc}</h3>
                    <div style="font-size:36px; font-weight:700;">$${p.price}</div>
                    <div style="color:${p.price > p.prevClose ? 'var(--green)' : 'var(--red)'}">
                        ${p.price > p.prevClose ? '+' : ''}${(p.price - p.prevClose).toFixed(2)} Today
                    </div>
                </div>
                <div class="card">
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>Bid</span><span>$${(p.price - 0.02).toFixed(2)}</span></div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>Ask</span><span>$${(p.price + 0.02).toFixed(2)}</span></div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>Day High</span><span>$${(p.price + 1.50).toFixed(2)}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Day Low</span><span>$${(p.price - 1.50).toFixed(2)}</span></div>
                </div>
                <button class="schwab-btn-primary" onclick="UI.navigate('trade')">Trade ${p.sym}</button>
            </div>
        `;
        document.getElementById('main-view').innerHTML = html;
        UI.currentRoute = 'quote';
    },

    renderTrade: () => {
        const html = `
            <div class="title-bar">
                <h2>Trade</h2>
            </div>
            <div class="screen">
                <div class="input-group">
                    <label>Symbol</label>
                    <input type="text" placeholder="Search Symbol (e.g. AAPL)" value="AAPL">
                </div>
                <div class="card" style="background:#f8f9fa;">
                    <div style="display:flex; justify-content:space-between;"><span>Last Price</span><span>$172.50</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Bid/Ask</span><span>$172.48 / $172.52</span></div>
                </div>
                
                <div class="input-group" style="margin-top:20px;">
                    <label>Quantity</label>
                    <input type="number" placeholder="0" value="10">
                </div>

                <div class="input-group">
                    <label>Order Type</label>
                    <select><option>Market</option><option>Limit</option><option>Stop</option><option>Stop Limit</option></select>
                </div>

                <div class="input-group">
                    <label>Timing</label>
                    <select><option>Day Only</option><option>Good 'Til Canceled</option></select>
                </div>

                <button class="schwab-btn-primary" onclick="UI.toast('Order preview generated. Swipe to confirm.')">Preview Order</button>
            </div>
        `;
        document.getElementById('main-view').innerHTML = html;
    },

    renderTransfers: () => {
        const html = `
            <div class="title-bar">
                <h2>Move Money</h2>
            </div>
            <div class="screen">
                <div class="card" onclick="UI.toast('ACH Transfer Initiated')">
                    <h3>Transfer Funds (ACH)</h3>
                    <div class="sub">From Bank to Schwab</div>
                </div>
                <div class="card" onclick="UI.toast('Camera opened for Check Deposit')">
                    <h3>Mobile Check Deposit</h3>
                    <div class="sub">Deposit check via camera</div>
                </div>
                <div class="card" onclick="UI.toast('Schwab to Schwab transfer')">
                    <h3>Schwab to Schwab</h3>
                    <div class="sub">Internal asset transfer</div>
                </div>
            </div>
        `;
        document.getElementById('main-view').innerHTML = html;
    },

    renderMarkets: () => {
        let html = `
            <div class="title-bar">
                <h2>Markets & Watchlist</h2>
            </div>
            <div class="mkt-idx-bar">
                <div class="idx"><span>S&P 500</span><div class="val up">5,250.00</div><div class="up">+0.5%</div></div>
                <div class="idx"><span>Nasdaq</span><div class="val up">16,300.00</div><div class="up">+0.8%</div></div>
                <div class="idx"><span>Dow</span><div class="val down">39,200.00</div><div class="down">-0.1%</div></div>
            </div>
            <div class="screen">
                <h3 style="margin-bottom:10px;">My Watchlist</h3>
        `;
        
        ['TSLA', 'NVDA', 'AMZN'].forEach(sym => {
            const price = (200 + Math.random() * 1000).toFixed(2);
            const change = (Math.random() - 0.5 * 10).toFixed(2);
            const cls = change > 0 ? 'green' : 'red';
            html += `
                <div class="position-row" onclick="UI.renderQuote('${sym}')">
                    <div><div class="sym">${sym}</div></div>
                    <div class="right">
                        <div class="val">$${price}</div>
                        <div class="pl ${cls}">${change > 0 ? '+' : ''}${change}%</div>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        document.getElementById('main-view').innerHTML = html;
    }
};
