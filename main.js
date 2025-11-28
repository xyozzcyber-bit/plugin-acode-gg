(function(){if(document.getElementById("grad-float-btn"))return;let g=document.createElement("style");g.innerHTML=`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        
        /* HANYA apply style ke elemen dengan class .grad-app-scope */
        .grad-app-scope, .grad-app-scope * {
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        
        /* Floating Button */
        #grad-float-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(45deg, #ff357a, #fff172);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            z-index: 9999;
            user-select: none;
            transition: transform 0.1s;
        }
        #grad-float-btn:active { transform: scale(0.9); }

        /* Modal Overlay */
        #grad-modal {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        }

        /* Container Style */
        .grad-container {
            width: 90%;
            max-width: 400px;
            background: #1e1e1e;
            color: white;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            border: 1px solid #333;
            max-height: 85vh;
            overflow-y: auto;
        }

        .grad-app-scope .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .grad-app-scope .close-btn { background: none; border: none; color: #ff5f5f; font-size: 24px; cursor: pointer; }

        #grad-preview {
            width: 100%;
            height: 120px;
            border-radius: 12px;
            margin-bottom: 15px;
            border: 2px solid #fff;
        }

        .grad-app-scope .control-group { margin-bottom: 15px; }
        .grad-app-scope label { display: block; font-size: 12px; color: #aaa; margin-bottom: 5px; }
        
        .grad-app-scope select, .grad-app-scope input[type="range"] {
            width: 100%;
            padding: 8px;
            background: #2a2a2a;
            border: 1px solid #444;
            color: white;
            border-radius: 6px;
            outline: none;
        }

        /* Colors */
        .grad-app-scope .color-list { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px; }
        .grad-app-scope .color-wrap { position: relative; }
        .grad-app-scope input[type="color"] {
            width: 40px; height: 40px; border: none; background: none; cursor: pointer; padding: 0;
        }
        .grad-app-scope .remove-color {
            position: absolute; top: -5px; right: -5px;
            background: red; color: white; border-radius: 50%;
            width: 15px; height: 15px; font-size: 10px;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
        }

        .grad-app-scope .btn-action {
            background: #333; color: white; border: 1px solid #555;
            padding: 5px 10px; border-radius: 6px; cursor: pointer; font-size: 12px;
        }

        /* Code Box */
        .grad-app-scope .code-box {
            background: #111;
            padding: 10px;
            border-radius: 6px;
            font-family: monospace; /* Keep monospace for code */
            font-size: 12px;
            word-break: break-all;
            margin-top: 10px;
        }
        
        .grad-app-scope .hl-prop { color: #569cd6; }
        .grad-app-scope .hl-func { color: #dcdcaa; }
        .grad-app-scope .hl-val { color: #ce9178; }

        .grad-app-scope .copy-btn {
            width: 100%;
            margin-top: 10px;
            padding: 10px;
            background: linear-gradient(90deg, #00c6ff, #0072ff);
            border: none;
            color: white;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
        }
    `,document.head.appendChild(g);let h=`
        <div id="grad-float-btn" class="grad-app-scope">\u{1F3A8}</div>
        
        <div id="grad-modal" class="grad-app-scope">
            <div class="grad-container">
                <div class="header">
                    <h3>Gradient Gen Z</h3>
                    <button class="close-btn">&times;</button>
                </div>

                <div id="grad-preview"></div>

                <div class="control-group">
                    <label>Type</label>
                    <select id="grad-type">
                        <option value="linear-gradient">Linear Gradient</option>
                        <option value="radial-gradient">Radial Gradient</option>
                    </select>
                </div>

                <div class="control-group" id="deg-group">
                    <label>Rotation (<span id="deg-val">90deg</span>)</label>
                    <input type="range" id="grad-deg" min="0" max="360" value="90">
                </div>

                <div class="control-group">
                    <label>Colors</label>
                    <div class="color-list" id="color-list"></div>
                    <button class="btn-action" id="add-color">+ Add Color</button>
                </div>

                <div class="code-box" id="code-output"></div>
                
                <button class="copy-btn" id="copy-code">Copy Code</button>
            </div>
        </div>
    `,u=document.createElement("div");u.innerHTML=h,document.body.appendChild(u);let o={type:"linear-gradient",deg:90,colors:["#ff00cc","#333399"]},t=document.getElementById("grad-float-btn"),m=document.getElementById("grad-modal"),v=document.querySelector(".close-btn"),w=document.getElementById("grad-preview"),k=document.getElementById("grad-type"),E=document.getElementById("grad-deg"),B=document.getElementById("deg-val"),f=document.getElementById("color-list"),C=document.getElementById("add-color"),L=document.getElementById("code-output"),l=document.getElementById("copy-code"),I=document.getElementById("deg-group");function b(){let e=o.colors.join(", ");return o.type==="linear-gradient"?`linear-gradient(${o.deg}deg, ${e})`:`radial-gradient(circle, ${e})`}function d(){let e=b();w.style.background=e,I.style.display=o.type==="radial-gradient"?"none":"block";let n=`background: ${e};`;L.innerHTML=n.replace(/(background):/g,'<span class="hl-prop">$1</span>:').replace(/(linear-gradient|radial-gradient)/g,'<span class="hl-func">$1</span>').replace(/(#[\w\d]+|deg|circle)/g,'<span class="hl-val">$1</span>')}function p(){f.innerHTML="",o.colors.forEach((e,n)=>{let a=document.createElement("div");a.className="color-wrap";let r=document.createElement("input");r.type="color",r.value=e,r.oninput=T=>{o.colors[n]=T.target.value,d()};let c=document.createElement("div");c.className="remove-color",c.innerHTML="x",c.onclick=()=>{o.colors.length>2?(o.colors.splice(n,1),p(),d()):alert("Minimal 2 warna dong!")},a.appendChild(r),a.appendChild(c),f.appendChild(a)})}t.onclick=()=>{m.style.display="flex"},v.onclick=()=>{m.style.display="none"},k.onchange=e=>{o.type=e.target.value,d()},E.oninput=e=>{o.deg=e.target.value,B.innerText=o.deg+"deg",d()},C.onclick=()=>{o.colors.push("#ffffff"),p(),d()},l.onclick=()=>{navigator.clipboard.writeText(`background: ${b()};`).then(()=>{l.innerText="Copied! \u{1F44C}",setTimeout(()=>l.innerText="Copy Code",1500)})},document.addEventListener("keydown",function(e){e.ctrlKey&&e.shiftKey&&(e.key==="g"||e.key==="G")&&(e.preventDefault(),t.style.display=t.style.display==="none"?"flex":"none")});let i=!1,s={x:0,y:0};function x(e){i=!0;let n=e.touches?e.touches[0].clientX:e.clientX,a=e.touches?e.touches[0].clientY:e.clientY,r=t.getBoundingClientRect();s={x:n-r.left,y:a-r.top}}function y(e){if(!i)return;e.preventDefault();let n=e.touches?e.touches[0].clientX:e.clientX,a=e.touches?e.touches[0].clientY:e.clientY;t.style.left=n-s.x+"px",t.style.top=a-s.y+"px",t.style.right="auto",t.style.bottom="auto"}t.addEventListener("mousedown",x),document.addEventListener("mousemove",y),document.addEventListener("mouseup",()=>i=!1),t.addEventListener("touchstart",x),document.addEventListener("touchmove",y),document.addEventListener("touchend",()=>i=!1),p(),d(),console.log("Gradient Generator Fixed (Safe Fonts)")})();
