import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://whhnijvhrkpgyesosjyx.supabase.co',
  'sb_publishable_G-YJXa7xddQUv_ThcsVngw_86AoeUOf'
)

function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Noto+Serif+SC:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      *{box-sizing:border-box;margin:0;padding:0;border-radius:0 !important;}
      body{background:#080C0A;}
      @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes glitch{
        0%,100%{text-shadow:-2px 0 #ff00ff,2px 0 #00ffff;transform:translateX(0)}
        20%{text-shadow:-3px 0 #ff00ff,3px 0 #00ffff;transform:translateX(-2px)}
        40%{text-shadow:3px 0 #ff00ff,-3px 0 #00ffff;transform:translateX(2px)}
        60%{text-shadow:-2px 2px #ff00ff,2px -2px #00ffff;transform:translateX(-1px)}
        80%{text-shadow:2px -2px #ff00ff,-2px 2px #00ffff;transform:translateX(1px)}
      }
      @keyframes glitchHeavy{
        0%,100%{text-shadow:-2px 0 #ff00ff,2px 0 #00ffff;transform:translateX(0);clip-path:inset(0)}
        5%{text-shadow:-5px 0 #ff00ff,5px 0 #00ffff;transform:translateX(-10px);clip-path:inset(15% 0 65% 0)}
        7%{text-shadow:6px 0 #ff00ff,-6px 0 #00ffff;transform:translateX(12px);clip-path:inset(65% 0 10% 0)}
        9%{text-shadow:-2px 0 #ff00ff,2px 0 #00ffff;transform:translateX(0);clip-path:inset(0)}
        25%{text-shadow:-2px 0 #ff00ff,2px 0 #00ffff;transform:translateX(0)}
        28%{text-shadow:4px 0 #ff00ff,-4px 0 #00ffff;transform:translateX(-8px);clip-path:inset(40% 0 30% 0)}
        30%{text-shadow:-7px 0 #ff00ff,7px 0 #00ffff;transform:translateX(14px);clip-path:inset(5% 0 80% 0)}
        32%{transform:translateX(0);clip-path:inset(0)}
        55%{text-shadow:-2px 0 #ff00ff,2px 0 #00ffff;transform:translateX(0)}
        58%{transform:translateX(-15px);clip-path:inset(70% 0 5% 0);text-shadow:5px 0 #ff00ff,-5px 0 #00ffff}
        60%{transform:translateX(9px);clip-path:inset(20% 0 60% 0)}
        62%{transform:translateX(0);clip-path:inset(0);text-shadow:-2px 0 #ff00ff,2px 0 #00ffff}
        80%{text-shadow:-2px 0 #ff00ff,2px 0 #00ffff;transform:translateX(0)}
        83%{transform:translateX(-6px);clip-path:inset(55% 0 20% 0);text-shadow:3px 0 #ff00ff,-3px 0 #00ffff}
        85%{transform:translateX(0);clip-path:inset(0)}
      }
      @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
      @keyframes float{
        0%,100%{transform:translateY(0) scale(1);opacity:.5}
        50%{transform:translateY(-14px) scale(1.1);opacity:.9}
      }
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes pulse{0%,100%{opacity:.4}50%{opacity:.9}}
      @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
      @keyframes flicker{
        0%{opacity:1}3%{opacity:.97}6%{opacity:1}
        9%{opacity:.98}12%{opacity:1}20%{opacity:.97}
        23%{opacity:1}50%{opacity:1}53%{opacity:.97}
        56%{opacity:1}80%{opacity:.98}83%{opacity:1}100%{opacity:1}
      }
      @keyframes badgeSlideIn{
        0%{transform:translateY(-80px) scale(.8);opacity:0}
        40%{transform:translateY(8px) scale(1.05);opacity:1}
        60%{transform:translateY(-4px) scale(.98)}
        80%{transform:translateY(2px) scale(1.01)}
        100%{transform:translateY(0) scale(1);opacity:1}
      }
      .opt-btn{
        width:100%;background:transparent;
        border:none;
        text-align:left;cursor:pointer;
        padding:14px 20px;transition:all .15s ease;
        color:#6a6058;font-family:'Noto Sans SC',sans-serif;
      }
      .opt-btn:hover{
        background:rgba(201,168,76,.06);color:#e8e0d0;
        box-shadow:4px 0 0 0 #c9a84c,-4px 0 0 0 #c9a84c,0 4px 0 0 #c9a84c,0 -4px 0 0 #c9a84c;
      }
      .opt-btn.sel{
        background:rgba(201,168,76,.1);color:#e8e0d0;
        box-shadow:4px 0 0 0 #c9a84c,-4px 0 0 0 #c9a84c,0 4px 0 0 #c9a84c,0 -4px 0 0 #c9a84c;
      }
      .crt-overlay{pointer-events:none;position:fixed;inset:0;z-index:9999;
        background:repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(0,0,0,.08) 5px,rgba(0,0,0,.08) 8px);}
      .crt-vignette{pointer-events:none;position:fixed;inset:0;z-index:9998;
        background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,.7) 100%);}
      .crt-scan{pointer-events:none;position:fixed;left:0;top:0;width:100%;height:60px;z-index:9997;
        background:linear-gradient(transparent,rgba(0,255,255,.03),transparent);
        animation:scanline 7s linear infinite;}
      .flicker{animation:flicker .1s infinite;}
      .px-gold{border:3px solid #c9a84c;box-shadow:3px 3px 0 #7a6020,0 0 8px rgba(201,168,76,.4);}
      .px-teal{border:3px solid #7eb8c9;box-shadow:3px 3px 0 #2a5560;}
      .px-lav{border:3px solid #c9a0dc;box-shadow:3px 3px 0 #5a2068;}
      .px-warm{border:3px solid #9a8070;box-shadow:3px 3px 0 #4a3020;}
      ::-webkit-scrollbar{width:4px}
      ::-webkit-scrollbar-track{background:#080C0A}
      ::-webkit-scrollbar-thumb{background:#2a2520}
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);
  return null;
}

// ─── CRT NOISE BACKGROUND ──────────────────────────────────────────────────
function CRTNoise() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = 128, h = 128;
    canvas.width = w;
    canvas.height = h;
    let frame;
    let last = 0;
    const draw = (t) => {
      frame = requestAnimationFrame(draw);
      if (t - last < 66) return;
      last = t;
      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 24;
        d[i] = v;
        d[i + 1] = v + Math.random() * 6;
        d[i + 2] = v + Math.random() * 4;
        d[i + 3] = 18;
      }
      ctx.putImageData(img, 0, 0);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none", imageRendering: "pixelated",
      opacity: 0.7,
    }} />
  );
}

// ─── STATIC BURST (CHANNEL CHANGE) ─────────────────────────────────────────
function StaticBurst({ active, onDone }) {
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = 128, h = 200;
    canvas.width = w;
    canvas.height = h;
    const draw = () => {
      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };
    draw();
    const interval = setInterval(draw, 30);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onDoneRef.current();
    }, 200);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [active]);
  if (!active) return null;
  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      zIndex: 10001, imageRendering: "pixelated",
    }} />
  );
}

// ─── PIXEL STARS ────────────────────────────────────────────────────────────
function PixelStars({ n = 28 }) {
  const stars = useRef([]);
  if (!stars.current.length) {
    for (let i = 0; i < n; i++) stars.current.push({
      x: Math.random() * 100, y: Math.random() * 100,
      sz: Math.ceil(Math.random() * 3),
      delay: Math.random() * 5, dur: 2 + Math.random() * 4,
      col: ["#7eb8c9","#c9a0dc","#c9a84c","#00ffcc"][Math.floor(Math.random()*4)],
    });
  }
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
      {stars.current.map((s,i) => (
        <div key={i} style={{
          position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
          width:s.sz*4, height:s.sz*4, background:s.col,
          animation:`float ${s.dur}s ease-in-out ${s.delay}s infinite`,
          imageRendering:"pixelated",
        }}/>
      ))}
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const QS = [
  {id:1,ch:1,q:"你最近一次真的很投入地做一件事，那件事的动力来源更接近：",opts:[
    {t:"我想赢，我不想在这件事上输给任何人",s:{竞:3}},
    {t:"做完这件事，日子会稳一些——这就够了",s:{稳:3}},
    {t:"说不上来，我只是在做，没有想太多",s:{漂:3}},
    {t:"我就是想做，跟有没有用没什么关系",s:{我:3}},
  ]},
  {id:2,ch:1,q:"高压下，你更像哪种东西：",opts:[
    {t:"引擎——压力越大，转速越高，进入状态",s:{竞:3}},
    {t:"弹簧——能压缩，但需要时间弹回来，别一直压",s:{稳:3}},
    {t:"沙袋——扛得住，但每次都有一点东西悄悄漏掉",s:{漂:3}},
    {t:"插销——感觉不对，我就换个地方插",s:{我:3}},
  ]},
  {id:3,ch:1,q:"一件事做到一半，发现走不下去了，你通常：",opts:[
    {t:"找到卡点，死磕，继续往前",s:{竞:3,本:1}},
    {t:"后退一步，重新评估，再往前",s:{稳:2,本:1}},
    {t:"卡着卡着，就一直卡在那里",s:{漂:3}},
    {t:"放弃这条路，开始想有没有另一种玩法",s:{我:3}},
  ]},
  {id:4,ch:1,q:`对你来说，"熬"这件事：`,opts:[
    {t:"是一种策略——熬过去，对面是我想要的",s:{竞:3}},
    {t:"是一种代价——可以熬，但要值得，不然不划算",s:{稳:3}},
    {t:"是一种消耗——我知道自己在熬，但我不知道在熬什么",s:{漂:3}},
    {t:"是一种信号——让我想熬这么久的事，本身值不值得被熬？",s:{我:3}},
  ]},
  {id:5,ch:1,q:"你的人生规划更像：",opts:[
    {t:"甘特图——阶段、节点、可交付物，越清晰越安心",s:{稳:2,本:2}},
    {t:"路线图——大方向确定，细节走着看",s:{稳:1,竞:1,本:1}},
    {t:"便利贴——贴了很多，不确定哪张算数",s:{漂:3}},
    {t:"空白纸——我不太相信提前画好的东西",s:{我:3}},
  ]},
  {id:6,ch:1,q:"你最怕的不是失败，是：",opts:[
    {t:"明明有机会，但没有全力以赴，最后留了遗憾",s:{竞:3}},
    {t:"一直在飘，最后什么都没稳下来，连落点都没有",s:{稳:3}},
    {t:"回头看，发现每一步都是被推着走的，没有一个是自己选的",s:{漂:3}},
    {t:"活得很体面，但跟自己真正想要的生活，差得很远",s:{我:3}},
  ]},
  {id:7,ch:1,q:`如果现在有人问你"五年后你在哪"，你通常：`,opts:[
    {t:"有一个比较具体的答案，或者至少有清晰的方向",s:{竞:2,本:1}},
    {t:"有大概的轮廓，但不会说太死",s:{稳:2}},
    {t:`说"不知道"，然后有点不舒服`,s:{漂:2}},
    {t:`说"不知道"，然后觉得这很正常`,s:{我:2}},
  ]},
  {id:8,ch:2,q:"一个普通的周三晚上，你最可能在做什么：",opts:[
    {t:"在做某件跟工作或职业发展有关的事",s:{竞:2,留:1}},
    {t:"做饭、看剧、刷手机，正常过日子",s:{稳:2}},
    {t:"刷着手机，有点无聊，又不知道该干嘛",s:{漂:3}},
    {t:"在搞自己的某个项目，研究某个脑子里转了很久的想法",s:{我:3}},
  ]},
  {id:9,ch:2,q:"你现在住的这个地方，你们之间更像：",opts:[
    {t:"合作关系——它给我机会，我在这里拼，互相成就",s:{留:3,竞:1}},
    {t:`租客关系——住着，还行，但我没想过真的"买下来"`,s:{留:1,稳:1}},
    {t:"过客关系——我一直觉得自己在这里只是暂时的，然后暂时了很久",s:{漂:2,留:1}},
    {t:`说不清楚——我对"家"这件事本来就没有很固定的定义`,s:{我:3}},
  ]},
  {id:10,ch:2,dw:true,q:"OPT到期，H1B连续两年没中，公司没办法再续你的身份。你的第一反应是：",opts:[
    {t:"我早就在备用方案了——读书续签、L1、换公司，总有出路",s:{竞:3,留:3,本:2}},
    {t:"冷静评估。如果国内有合适的机会，这反而可能是个契机",s:{稳:2,回:3}},
    {t:"会很崩。那种感觉像是之前所有的努力突然不算数了",s:{漂:3,留:1}},
    {t:"说不定这就是一个信号，让我去想想有没有另一种活法",s:{我:3}},
  ]},
  {id:11,ch:2,q:"在这里，你真正意义上的朋友（不是礼貌往来那种），大概是：",opts:[
    {t:"有几个，中国人外国人都有，我是那种会主动建立关系的人",s:{留:2,竞:1,本:1}},
    {t:"有几个，大部分是中国人，偶尔聚一聚，关系还不错",s:{留:1,稳:1}},
    {t:"老实说不多。我一直没有真的融进去",s:{漂:2}},
    {t:`我对"朋友"的定义很宽，真正有共鸣的人到哪里都能找到`,s:{我:2}},
  ]},
  {id:12,ch:2,q:"你上一次认真想象回国之后的生活，脑子里出现的第一个画面是：",opts:[
    {t:"在某个平台或公司的核心岗位，用海外背景换到真实的职业溢价",s:{回:2,竞:2,本:1}},
    {t:"回到熟悉的城市，节奏变慢，但反而踏实",s:{回:3,稳:2}},
    {t:"越想越焦虑，不确定自己能去哪，能被放在什么位置",s:{漂:2,回:1}},
    {t:`我想的不是"找个工作回去"，我想的是做点不一样的事`,s:{我:3}},
  ]},
  {id:13,ch:2,q:"刷国内朋友圈，你的感觉更接近：",opts:[
    {t:"看热闹，偶尔羡慕，但大部分时候觉得自己选了另一条路",s:{留:2}},
    {t:"挺亲切的——他们的生活我能理解，我知道我随时能回去",s:{回:3,稳:1}},
    {t:"有点陌生，又有点想念。像是隔着玻璃看里面",s:{漂:2,回:1}},
    {t:`我的朋友圈本来就是混的，我不太区分"国内"和"国外"`,s:{我:3}},
  ]},
  {id:14,ch:2,q:`在这里，你有没有某个真实的瞬间，觉得"对，就是这里，我想在这里待"？`,opts:[
    {t:"有——通常是在工作或项目上真的做出什么的时候",s:{竞:2,留:2}},
    {t:"有——就是某个很普通的晚上，突然觉得挺好的",s:{稳:2,留:1}},
    {t:"说不上来。我总觉得这里是暂时的，好像一直在等什么",s:{漂:3}},
    {t:`我不需要那种时刻。我不靠"归属感"来决定自己在哪里`,s:{我:3}},
  ]},
  {id:15,ch:3,q:"你所在的方向，未来三年在美国的机会，你真实的判断是：",opts:[
    {t:"还在增长——AI/生物/金融工程，外国人的空间还在",s:{留:3,本:2}},
    {t:"平稳——不会暴涨，但也不至于崩，稳住就行",s:{留:1,稳:1,本:1}},
    {t:"在收缩——裁员、签证收紧、竞争加剧，窗口越来越窄",s:{回:2,漂:1}},
    {t:"我不太确定，也没有认真研究过",s:{漂:2}},
  ]},
  {id:16,ch:3,q:"如果现在回国，你最可能的落地方式是：",opts:[
    {t:"有比较明确的渠道——家里或学校的人脉可以接住我",s:{本:3,回:1}},
    {t:"没有太多现成资源，但我有信心自己找，大概能落地",s:{本:1,稳:1}},
    {t:"能回去，但不太确定能被放在什么位置，感觉会很被动",s:{漂:2}},
    {t:"我不想走靠资源落地的路。我想靠自己搭出另一套",s:{我:3}},
  ]},
  {id:17,ch:3,q:"关于未来五年的中美格局，你更相信哪个判断：",opts:[
    {t:"两边都有机会，但窗口在缩小——越快决定越好",s:{竞:2,本:1}},
    {t:"中国还有大盘——新能源/AI/内需都还有机会，时机不算太差",s:{回:2,稳:1}},
    {t:"两边都在收紧——外国人在美的空间在缩，海归红利也快消失",s:{漂:3}},
    {t:"大势我掌控不了，我更专注在自己能做的事上",s:{我:3}},
  ]},
  {id:18,ch:3,q:"你当初对留学的预期，和现在的现实，中间的距离：",opts:[
    {t:"基本一致，甚至有些超出——我知道我在做什么",s:{竞:1,本:2}},
    {t:"有落差，但可以接受——人生没办法完全按预期",s:{稳:2,本:1}},
    {t:"落差比较大——有时候会想，这一切到底值不值",s:{漂:3}},
    {t:`我从来不用"值不值"来衡量这段经历`,s:{我:3}},
  ]},
  {id:19,ch:3,q:"如果五年后回头看，发现留学对你人生的改变没有想象中大，你更接近：",opts:[
    {t:"我会继续想办法——任何牌都可以是筹码，看你怎么打",s:{竞:3,本:1}},
    {t:"可以接受——我不指望一件事改变所有事",s:{稳:3}},
    {t:"会很失落——我投入了很多，我需要它是值得的",s:{漂:3}},
    {t:`我会重新定义"值得"——这件事本来就不该这么算`,s:{我:3}},
  ]},
  {id:20,ch:3,q:"最后一题。你最怕自己最后活成：",opts:[
    {t:"明明有能力，但没有真的拼过，留了一辈子的遗憾",s:{竞:3}},
    {t:`一直在飘，什么都没落下来，连一个能叫"家"的地方都没有`,s:{稳:3}},
    {t:"回头看，每一个决定都是被推着走的，没有一个真的是自己选的",s:{漂:3}},
    {t:"活得很安全，很体面，但跟自己真正想要的那种生活，差了很远",s:{我:3}},
  ]},
];

const CHAPTERS = {
  1:{title:"第一章 · 你是谁"},
  2:{title:"第二章 · 你和海外的关系"},
  3:{title:"第三章 · 你和现实的距离"},
};

const RESULTS = {
  悬空生存者:{
    tier:"困局",symbol:"浮萍",role:"悬空生存者",badge:"候机厅的常客",
    acc:"#7eb8c9",px:"px-teal",img:"/images/悬空生存者.png",
    body:[
      `你以为你来这里是暂时的。结果"暂时"过了三年，又五年。`,
      "你的行李箱从来没有真正打开过——或者说，你打开了，但你从来没有想过要买一个书架。签证续了又续，工作换了一家又一家。朋友圈发出去的照片滤镜越来越好看，底下的城市越来越陌生。",
      `你习惯了在超市只买最小份的食材，因为买多了会烂掉。习惯了回国前两天才开始打包。习惯了在视频里告诉父母"挺好的"，然后挂掉电话，对着空白的天花板待很久。`,
      "你不是没想过回去。你是每次想到要回去，就发现自己已经没有太多回去的理由了。那个你离开时的朋友圈已经散了，那个你以为还在等你的城市，已经不认识你了。",
      "你成了两个坐标系里的误差。这里不太需要你，那里也不需要你这个版本。",
      "你像一颗被拔出来的植物，放进了一杯水里。根还活着，但长不出土壤来。",
      "你还活着，但你也找不到家的方向。",
    ],
    subKey:"落差承接者",
    subText:"你其实差一点就回去了。那年H1B没抽中，你打开了大众点评，开始看北京的合租房价格。后来公司帮你换了身份，你就没再打开过那个页面。",
  },
  高压兑现者:{
    tier:"伪好局",symbol:"精英",role:"高压兑现者",badge:"被成功定义的人",
    acc:"#c9a84c",px:"px-gold",img:"/images/高压兑现者.png",
    body:[
      "你做到了。这是真的。",
      `你进了大厂，涨了薪，换了身份，在曼哈顿租了一间不算挤的公寓，周末偶尔发一张照片，底下是"好羡慕"。你是小留群里的天花板，是父母逢年过节的谈资，是学弟学妹私信问"你怎么做到的"的那种人。`,
      "但你知道你在害怕什么。",
      "现在是凌晨十二点四十七分。办公室里就剩你一个人了。",
      "那份PPT你改了第十遍。VP说第九遍的字体不够clean，你没有问他哪里不clean，你只是改了。你知道就算改成第十一遍他可能还有意见，你也会改。你已经不在乎对不对了，你只是不能是那个没改完的人。。",
      "你刚刚发过去，盯着屏幕等了三分钟，没有回复。你知道他可能已经睡了。",
      "然后你就这样坐着，没有关电脑，也没有站起来。你抬头看着天花板——那种白色的格栅天花板，每一块都一样，你在这个办公室待了一年半，今天是第一次真的看见它。",
      "你突然不知道自己在做什么。是一种很平的、很安静的不知道。你努力，你赢，你升，你再努力——然后呢？这件事你想过很多次，每次想到一半就被下一个deadline打断了。现在周围没有声音，deadline是明天早上九点，你第一次把这个问题想到了最后。",
      "然后呢。",
      "你拿起手机。微信图标右上角有个红点。是你妈，两个小时前发的：今天晚上吃什么了？ 你点开，看了五秒，锁屏了。",
      "不是不想回。是你不知道说什么。说加班？她会说注意身体。说还好？你也不知道还好不还好。你已经很久没有想过自己好不好这件事了。",
      "你把手机扣在桌上。窗外是曼哈顿的夜景，每本介绍纽约的书里都会写那种夜景。很漂亮。你见过一千次了。",
      "你害怕停下来。不是因为有什么目标还没达到，而是因为你不知道停下来之后，你是谁。这个问题你以前没时间想，现在有时间了，你发现你也不敢想。",
      "你重新打开电脑，找到下一个要准备的材料。",
      "你成功了，你是父母的骄傲。",
      "你开始打字，你已读未回。",
    ],
    subKey:"偏航自由者",
    subText:"如果你在某次绩效季之后没撑住，或者哪天公司突然来了一轮裁员——你可能会走向另一条路。那条路更颠簸，但有些人在上面，反而第一次呼吸到了空气。",
  },
  异乡定居者:{
    tier:"标准局",symbol:"温水",role:"异乡定居者",badge:"七年签",
    acc:"#8ab4c0",px:"px-teal",img:"/images/异乡定居者.png",
    body:[
      "你留下来了。",
      "不是因为有多想留，是因为走的成本越来越高，留着的惯性越来越大。然后有一天你发现你已经在这里待了七年，买了车，养了猫，办了图书馆借书卡。",
      "生活过得去。公司不错，同事还行，工资够用。周末去hiking，或者去某家华人餐厅吃一顿不太正宗的火锅，假装回了一次家。",
      `你已经学会了不去想某些问题。比如"这里是不是我的家"，比如"我在这里算什么人"。这些问题以前会让你失眠，现在你练出了一种本领——就是在快要想起它们的时候，顺手拿起手机刷点别的。`,
      "你不是不幸福。你只是很难说清楚你在这里，到底是在生活，还是在等一个回去的理由。",
      `有一天你会申请永居，然后入籍，你妈会转发给亲戚，亲戚会说"真厉害"。`,
      "你也会觉得，挺好的。",
    ],
    subKey:"归位生活家",
    subText:"如果你五年前遇到了那段关系，或者那份工作没有续约成功，你可能早就回去了——同样的稳，但在一个更熟悉的土壤里。",
  },
  偏航自由者:{
    tier:"隐藏局",symbol:"出走",role:"偏航自由者",badge:"逃出主线",
    acc:"#c9a0dc",px:"px-lav",img:"/images/偏航自由者.png",
    body:[
      "你没有按剧本走。",
      "那条线你知道：找到对口工作，抽到H1B，办好绿卡，在郊区买一套带车库的房子。你走上去过，也在上面走了一段——然后有一天早上，你在open office里对着屏幕，突然不知道自己为什么坐在这里。",
      "不是崩溃，就是突然不知道了。",
      "你辞了职，或者被裁了，或者只是某个周一早上睁眼，决定不去了。反正你离开了那条线。一开始你以为是暂时的，后来你发现你不太想回去了。",
      "你没有高薪，没有title，没有清晰的五年规划。你有时候凌晨两点会觉得自己是不是走错了，然后睡醒，发现你还是不想回到那条路上。",
      "你不是成功的那种，也不是失败的那种。",
      "你是一个选了没有地图的路的人，还在走，不知道尽头在哪——但你已经习惯了这种不知道。挂了电话，走上街头，风吹在耳边，有点冷，你没有理会。",
    ],
    subKey:"高压兑现者",
    subText:"如果你没有在那个早上做出那个决定，你可能会是另一种人——更安全，更好看，但有些夜晚你会在备忘录里找到一个写了一半的想法，然后关掉，回到工作群里。",
  },
  回流放大器:{
    tier:"好局",symbol:"放大器",role:"回流放大器",badge:"时差红利",
    acc:"#c9a84c",px:"px-gold",img:"/images/回流放大器.png",
    body:[
      "你回来了，然后发现这里比你想象中更需要你。",
      "不是运气，是你在外面那几年练出来的东西，在这里的某个节点，刚好被放大了。",
      "你进了一个国内正在高速扩张的赛道，你带回来的视角在一群只在国内待过的人里，显出了一种难以复制的稀缺感。你不是最聪明的那个，但你是那个既懂国内逻辑又能对接海外的接口——这种人，现在真的不多。",
      "你没有精英光环，也没有氪金背景。你有的是一段真实走过来的弯路，和那条弯路留下来的判断力。",
      "你有时候会想，如果当时没有出去，会不会也一样。你觉得不会。那几年在没有人告诉你怎么做的时候，你学会了自己想清楚下一步。",
      "你不是一眼望到头的成功，你是那种在别人还没看清楚形势的时候，就已经开始动了的人。",
    ],
    subKey:"落差承接者",
    subText:"如果你再晚回来两年，行业窗口可能已经关了。时机这件事，有时候真的不讲道理。同样的能力，没有刚好落在对的缝隙里，结果会完全不一样。",
  },
  归位生活家:{
    tier:"普通局",symbol:"归根",role:"归位生活家",badge:"镀金螺丝",
    acc:"#8ab4c0",px:"px-teal",img:"/images/归位生活家.png",
    body:[
      "你回来了。",
      "落地那天你以为会有什么感觉，结果出了机场被湿热的空气扑了一下，然后换回国内SIM卡，等进度条转完的那十秒里，外卖软件知道你回来了，给你发了一张大额的外卖红包券，点了个外卖，楼下外卖小哥催你取餐。",
      "你进入状态了，像从来没有离开过。",
      "你进了一家还过得去的公司。不是BAT，但也不差，说出去大家知道。第一个月你开会的时候习惯性地用了几个英文缩写，旁边的同事抬头看了你一眼——不是崇拜，只是没听懂，等你解释。你解释完，他低头继续看自己的屏幕。从第二个月开始你不再用了。",
      "你的海外经历很快从自我介绍的第一段，移到了第二段，再后来，只剩简历上那一行字。",
      `你买了一辆代步的新能源车。你妈让你在她小区附近看看房价。周末你去了，看了两套，价格比你想象中高，你说"再等等看"，你妈说"等什么等，越等越贵"，你们在小区门口的小店坐了一个小时，你吃了一个煎饼果子，她喝了一杯热豆浆。`,
      "你送她回家，开车回自己的出租屋，路上堵了四十分钟。日子就这样过。不快，也不慢。",
      "有一天你在刷手机，刷到一个大学同学发的照片。还在那边，站在你们当年常去的那条街上，街灯是你记得的颜色，背景里有一家你去过的咖啡馆，还开着。你点了个赞，然后划走了。",
      "不是遗憾。你认真想了一下，真的不是遗憾。只是有一秒钟，你感觉有什么东西在胸口轻轻动了一下，像一条鱼摆了摆尾巴，然后沉下去了。",
      "你放下手机，去厨房热了昨天剩的饭。你落地了。日子是真实的，账单是真实的，你妈催你的声音是真实的。",
      "只是有一个版本的你，穿着当年出国时的那件外套，还站在那条街上，没有跟着你回来。",
      "你有时候会想起他。",
      "微波炉转了一分钟，叮的一声把你拉回现实，你把米饭盛进碗里，坐下来吃饭。"
    ],
    subKey:"回流放大器",
    subText:"如果你早回来两年，赶上了某个行业的风口，你可能变成另一种人——同样的你，不同的时机，被放大的倍数不一样。",
  },
  落差承接者:{
    tier:"普通局",symbol:"落差",role:"落差承接者",badge:"接口错误",
    acc:"#9a8070",px:"px-warm",img:"/images/落差承接者.png",
    body:[
      "你回来了，然后发现这里跟你记忆里的不太一样——或者说，是你跟这里，已经不太一样了。",
      "入职第一周，你们开了一个项目对齐会。十二个人，会议室有点挤，有人在吃外卖，屏幕上是一张密密麻麻的甘特图。你的上级——一个比你大八岁、在这家公司待了六年的男人——在讲某个执行细节。你听了三分钟，觉得有个地方可以说。",
      "你用了在外面开会时习惯的那种方式——直接，有依据，带了一个你在上一家公司见过的解决方案作为参考。你说完，停下来，等回应。",
      "房间里安静了大概两秒，然后你的上级说：嗯，这个我们之前也研究过，国内的情况不太一样。然后他继续往下讲。",
      `没有人看你。不是敌意，不是不尊重，就是——翻篇了。像你什么都没说过一样。`,
      "你坐在那里，杯子里的咖啡还是热的，你低头看了它一眼。你想起你在那边开会的方式，那种随时可以打断、随时可以push back、没有人会觉得你不懂规矩的感觉。你在那边花了三年才习惯那种节奏。然后你回来了，发现那三年把你变成了一个在这里需要重新学说话的人。",
      "下班你一个人走回地铁站。北京的秋天，风有点大。你想发一条朋友圈，写了三个字，删掉了。发给谁看？那边的朋友不懂这里，这里的朋友觉得你回家了——回了家还有什么好说的？",
      "你妈那天问你新工作怎么样。你说挺好的，同事都挺好的。她说那就好。",
      "你慢慢学会了在开会的时候说话之前先想两秒钟。慢慢学会了用这里的节奏写邮件，用这里的方式表达不同意。慢慢地，你不再总是在心里拿两边比较了——不是因为不再有落差，而是因为比了也没用。",
      "半年之后，你开始能接得住这里的球了。不是你变了。是你学会了在两个版本的自己之间，找到一个能过日子的姿势。",
      "没有人知道你经历了这个过程，因为从外面看，你只是回国了，工作找得还不错。",
      "承接，是你最后学会的那件事。不是接受，是承接——是那种把一个东西稳稳接住、不让它摔碎、也不假装它很轻的那种。",
    ],
    subKey:"归位生活家",
    subText:"如果你再晚一两年下决心回来，可能心理准备更充分一些，落地的方式更柔和。有时候，同一条路，走法不同，感受完全不一样。",
  },
  边界游民:{
    tier:"特殊局",symbol:"候鸟",role:"边界游民",badge:"永远在飞",
    acc:"#c9a0dc",px:"px-lav",img:"/images/边界游民.png",
    body:[
      "你从来没有做过那个决定。",
      `不是因为你犹豫，而是因为你慢慢发现，"留还是回"本身是一个不属于你的问题。那是一个假设人只能选一个地方、只能活一种生活的人提出来的问题。`,
      "你在两边都有一些项目，一些半开着的可能性，一些不需要每天见面但你知道对方在的人。你的家，是一个概念，而不是一个地址。",
      "你偶尔有一种轻微的漂浮感——没有哪里完全属于你，你也没有完全属于哪里。但你发现，这种感觉不一定是问题。",
      `只是有时候，在某个时区的深夜，你会突然想要一个真的属于你的地方，一个不需要解释"你从哪里来"的地方。`,
      "你还没找到。",
      "但你还在飞。",
    ],
    subKey:"异乡定居者",
    subText:"如果你当年在某次疲惫的时候停下来，选了一边安定下来，你可能更有根——但少了一种只有一直在飞的人才能看到的风景。",
  },
};

// ─── SCORING ────────────────────────────────────────────────────────────────
function score(answers) {
  const s={竞:0,稳:0,漂:0,我:0,留:0,回:0,本:0};
  QS.forEach(q=>{
    const idx=answers[q.id];
    if(idx==null)return;
    const m=q.dw?2:1;
    Object.entries(q.opts[idx].s).forEach(([k,v])=>{s[k]+=v*m;});
  });
  const drives={竞:s.竞,稳:s.稳,漂:s.漂,我:s.我};
  const top=Object.entries(drives).sort((a,b)=>b[1]-a[1]);
  let drive=top[0][0];
  if(drive!=="我"&&s.我>=top[0][1]-3)drive="我";
  const geo=s.留-s.回>4?"留":s.留-s.回<-4?"回":"双边";
  const cap=s.本>=10?"hi":s.本>=5?"mid":"lo";
  let main;
  if(drive==="我"){main=geo==="双边"?"边界游民":"偏航自由者";}
  else if(drive==="竞"){
    if(geo==="留")main=cap==="lo"?"异乡定居者":"高压兑现者";
    else if(geo==="回")main=cap==="lo"?"落差承接者":"回流放大器";
    else main=cap==="hi"?"回流放大器":"悬空生存者";
  }else if(drive==="稳"){
    if(geo==="留")main="异乡定居者";
    else if(geo==="回")main="归位生活家";
    else main=cap==="hi"?"异乡定居者":"落差承接者";
  }else{main=geo==="回"?"落差承接者":"悬空生存者";}
  return{main,consistent:answers[6]===answers[20]&&answers[6]!=null};
}

// ─── MUSIC PLAYER ───────────────────────────────────────────────────────────
const AUDIO_SRC = "/music/background_music.mp3";

function MusicPlayer({acc,autoPlay}){
  const[playing,setPlaying]=useState(false);
  const[prog,setProg]=useState(0);
  const ref=useRef(null);
  const ensureAudio=()=>{
    if(!ref.current&&AUDIO_SRC){
      ref.current=new Audio(AUDIO_SRC);
      ref.current.loop=true;
      ref.current.ontimeupdate=()=>{
        const a=ref.current;
        setProg(a.duration?(a.currentTime/a.duration)*100:0);
      };
    }
    return ref.current;
  };
  useEffect(()=>{
    if(!autoPlay||!AUDIO_SRC)return;
    const audio=ensureAudio();
    if(!audio)return;
    audio.volume=0;
    audio.play().catch(()=>{});
    setPlaying(true);
    let vol=0;
    const fadeIn=setInterval(()=>{
      vol=Math.min(vol+0.05,1);
      if(ref.current)ref.current.volume=vol;
      if(vol>=1)clearInterval(fadeIn);
    },100);
    return()=>clearInterval(fadeIn);
  },[]);
  const toggle=()=>{
    if(!AUDIO_SRC)return;
    ensureAudio();
    if(playing){ref.current.pause();setPlaying(false);}
    else{ref.current.play().catch(()=>{});setPlaying(true);}
  };
  return(
    <div style={{
      border:`3px solid ${acc}`,boxShadow:`3px 3px 0 rgba(0,0,0,.6), 0 0 8px ${acc}66`,
      background:"rgba(8,12,10,.8)",padding:"12px 16px",
      display:"flex",alignItems:"center",gap:12,marginTop:24,
    }}>
      <button onClick={toggle} style={{
        background:"transparent",border:"none",cursor:"pointer",
        color:acc,fontFamily:"'Press Start 2P',monospace",fontSize:10,padding:0,
        textShadow:`0 0 8px ${acc}99`,
      }}>{playing?"▐▐":"▶"}</button>
      <div style={{flex:1}}>
        <div style={{
          fontFamily:"'Press Start 2P',monospace",fontSize:7,
          color:acc,marginBottom:6,letterSpacing:1,
          textTransform:"uppercase",textShadow:`0 0 6px ${acc}66`,
        }}>
          {AUDIO_SRC?"NOW PLAYING":"AUDIO_SRC = NULL"}
        </div>
        <div style={{height:3,background:"rgba(255,255,255,.08)"}}>
          <div style={{width:`${prog}%`,height:"100%",background:acc,transition:"width .5s",
            boxShadow:`0 0 6px ${acc}88`}}/>
        </div>
      </div>
      <span style={{
        fontFamily:"'Press Start 2P',monospace",fontSize:8,
        color:"rgba(255,255,255,.2)",
      }}>{playing?"♫":"—"}</span>
    </div>
  );
}

// ─── SCREENS ────────────────────────────────────────────────────────────────
const ITN_OPTS=[
  {icon:"🔴",t:"留在这里"},
  {icon:"🔵",t:"回去"},
  {icon:"⚪",t:"不知道"},
  {icon:"🟡",t:"两边都想要"},
];

function Intro({onStart}){
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",padding:"40px 24px",position:"relative",overflow:"hidden"}}>
      <PixelStars n={22}/>
      <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"clamp(8px,2.5vw,11px)",
        color:"#c9a84c",letterSpacing:4,marginBottom:28,animation:"fadeIn 1s ease .2s both",textAlign:"center",lineHeight:2,
        textTransform:"uppercase",textShadow:"0 0 8px rgba(201,168,76,.6)"}}>
        第八种结局
      </div>
      <h1 style={{fontFamily:"'Noto Serif SC',serif",fontSize:"clamp(24px,7vw,40px)",fontWeight:300,
        color:"#e8e0d0",textAlign:"center",lineHeight:1.6,marginBottom:28,maxWidth:380,
        animation:"fadeUp 1s ease .4s both",
        textShadow:"-2px 0 #ff00ff, 2px 0 #00ffff"}}>
        毕业之前<br/>你一定想过这个问题
      </h1>
      <div style={{fontFamily:"'Noto Sans SC',sans-serif",fontSize:14,color:"#5a5248",
        textAlign:"center",lineHeight:2.1,maxWidth:310,marginBottom:44,
        animation:"fadeUp 1s ease .6s both",
        textShadow:"1px 0 rgba(0,255,255,0.2)"}}>
        毕业典礼那天，或者某个普通的周三晚上，<br/>
        或者刷到某人的朋友圈那一秒——<br/>
        你突然不知道自己在这里做什么<br/><br/>
        这个测试不会给你答案<br/>
        它只是想帮你看清楚<br/>
        在你现在的状态和条件下，你更可能走向哪一种结局<br/><br/>
        <span style={{color:"#3a3530",fontSize:12}}>
        你以为你在选择一个地方，其实你在选择一种孤独
        </span>
      </div>
      <button onClick={onStart} style={{
        fontFamily:"'Press Start 2P',monospace",fontSize:10,color:"#080C0A",
        background:"#c9a84c",border:"none",padding:"14px 32px",cursor:"pointer",
        letterSpacing:1,boxShadow:"4px 4px 0 #7a6020, 0 0 12px rgba(201,168,76,.4)",
        animation:"fadeUp 1s ease .9s both",transition:"transform .15s,box-shadow .15s",
        textTransform:"uppercase",
      }}
        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="4px 6px 0 #7a6020, 0 0 16px rgba(201,168,76,.5)";}}
        onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="4px 4px 0 #7a6020, 0 0 12px rgba(201,168,76,.4)";}}>
        开始测评 →
      </button>
    </div>
  );
}

function Intuition({onSelect}){
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",padding:"40px 24px"}}>
      <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:8,color:"#c9a84c",
        letterSpacing:2,marginBottom:36,animation:"fadeIn .5s ease both",
        textTransform:"uppercase",textShadow:"0 0 8px rgba(201,168,76,.6)"}}>
        直觉题 — 不计分
      </div>
      <p style={{fontFamily:"'Noto Serif SC',serif",fontSize:"clamp(16px,4.5vw,22px)",
        color:"#e8e0d0",textAlign:"center",lineHeight:1.9,maxWidth:360,marginBottom:12,
        animation:"fadeUp .6s ease .1s both",fontWeight:300,
        textShadow:"-2px 0 #ff00ff, 2px 0 #00ffff"}}>
        闭上眼睛三秒。<br/>你心里第一个冒出来的是：
      </p>
      <p style={{fontFamily:"'Noto Sans SC',sans-serif",fontSize:12,color:"#3a3530",
        marginBottom:36,animation:"fadeIn .6s ease .2s both",
        textShadow:"1px 0 rgba(0,255,255,0.15)"}}>
        结果页会告诉你直觉和测试是否一致
      </p>
      <div style={{width:"100%",maxWidth:360,display:"flex",flexDirection:"column",gap:10}}>
        {ITN_OPTS.map((o,i)=>(
          <button key={i} onClick={()=>onSelect(i)} style={{
            background:"transparent",border:"2px solid #1e1c18",
            padding:"15px 20px",cursor:"pointer",
            display:"flex",alignItems:"center",gap:14,
            transition:"all .15s",animation:`fadeUp .5s ease ${.15+i*.08}s both`,
          }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="4px 0 0 0 #c9a84c,-4px 0 0 0 #c9a84c,0 4px 0 0 #c9a84c,0 -4px 0 0 #c9a84c";e.currentTarget.style.borderColor="#c9a84c";e.currentTarget.style.background="rgba(201,168,76,.04)";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="#1e1c18";e.currentTarget.style.background="transparent";}}>
            <span style={{fontSize:18}}>{o.icon}</span>
            <span style={{fontFamily:"'Noto Sans SC',sans-serif",fontSize:14,color:"#7a7068",
              textShadow:"1px 0 rgba(0,255,255,0.15)"}}>{o.t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChapterCard({ch,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,2400);return()=>clearTimeout(t);},[]);
  const c=CHAPTERS[ch];
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",padding:"40px 24px"}}>
      <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:8,color:"#c9a84c",
        letterSpacing:3,marginBottom:20,animation:"fadeIn .5s ease both",
        textTransform:"uppercase",textShadow:"0 0 8px rgba(201,168,76,.6)"}}>
        CHAPTER {ch} / 3
      </div>
      <h2 style={{fontFamily:"'Noto Serif SC',serif",fontSize:"clamp(20px,5.5vw,30px)",
        fontWeight:300,color:"#e8e0d0",marginBottom:16,textAlign:"center",
        animation:"fadeUp .7s ease .2s both",
        textShadow:"-2px 0 #ff00ff, 2px 0 #00ffff"}}>
        {c.title}
      </h2>
      <p style={{fontFamily:"'Noto Sans SC',sans-serif",fontSize:13,color:"#4a4840",
        textAlign:"center",animation:"fadeIn .7s ease .5s both",
        textShadow:"1px 0 rgba(0,255,255,0.15)"}}>
        {c.sub}
      </p>
    </div>
  );
}

function Question({qi,q,onAnswer}){
  const[sel,setSel]=useState(null);
  useEffect(()=>setSel(null),[qi]);
  const pick=i=>{setSel(i);setTimeout(()=>onAnswer(i),360);};
  const labels=["A","B","C","D"];
  return(
    <div key={qi} style={{minHeight:"100vh",display:"flex",
      flexDirection:"column",paddingBottom:60,animation:"fadeIn .3s ease both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
        padding:"18px 24px",borderBottom:"1px solid #141210"}}>
        <span style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:"#2a2820",letterSpacing:1,
          textTransform:"uppercase",textShadow:"0 0 4px rgba(201,168,76,.3)"}}>
          {["","第一章","第二章","第三章"][q.ch]}
        </span>
        <span style={{fontFamily:"'Press Start 2P',monospace",fontSize:8,color:"#2a2820",
          textShadow:"0 0 4px rgba(201,168,76,.3)"}}>
          {qi+1} / {QS.length}
        </span>
      </div>
      <div style={{height:2,background:"#141210"}}>
        <div style={{width:`${(qi/QS.length)*100}%`,height:"100%",background:"#c9a84c",transition:"width .4s ease",
          boxShadow:"0 0 6px rgba(201,168,76,.5)"}}/>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"28px 24px 0"}}>
        <div style={{fontFamily:"'Noto Serif SC',serif",
          fontSize:"clamp(68px,20vw,110px)",
          color:"#0e0c08",fontWeight:700,lineHeight:1,
          marginBottom:-18,userSelect:"none",letterSpacing:-4,
          textShadow:"0 0 20px rgba(201,168,76,.05)"}}>
          {String(q.id).padStart(2,"0")}
        </div>
        {q.dw&&(
          <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:"#c9a84c",
            letterSpacing:1,marginBottom:10,animation:"pulse 2s ease infinite",
            textTransform:"uppercase",textShadow:"0 0 8px rgba(201,168,76,.6)"}}>
            ★ KEY QUESTION
          </div>
        )}
        <p style={{fontFamily:"'Noto Serif SC',serif",fontSize:"clamp(15px,4.2vw,19px)",
          color:"#e8e0d0",lineHeight:1.8,fontWeight:300,marginBottom:28,
          animation:"fadeUp .4s ease .05s both",
          textShadow:"1px 0 rgba(0,255,255,0.2)"}}>
          {q.q}
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          {q.opts.map((o,i)=>(
            <button key={i} onClick={()=>pick(i)}
              className={`opt-btn${sel===i?" sel":""}`}
              style={{
                fontSize:"clamp(13px,3.5vw,15px)",lineHeight:1.7,
                animation:`fadeUp .4s ease ${.08+i*.06}s both`,
                opacity:sel!=null&&sel!==i?.3:1,
                textShadow:"1px 0 rgba(0,255,255,0.1)",
              }}>
              <span style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,
                color:"#c9a84c",marginRight:12,textShadow:"0 0 6px rgba(201,168,76,.5)"}}>{labels[i]}</span>
              {o.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const LOADING_LINES=["正在分析你的路径……","根据你的 20 个选择，在 8 种可能的结局中定位你……"];

function Loading({onDone}){
  const[visibleChars,setVisibleChars]=useState([0,0,0]);
  const[activeLine,setActiveLine]=useState(-1);
  const[btn,setBtn]=useState(false);

  useEffect(()=>{
    const allTimers=[];
    let offset=700;
    LOADING_LINES.forEach((line,li)=>{
      allTimers.push(setTimeout(()=>setActiveLine(li),offset));
      for(let c=1;c<=line.length;c++){
        allTimers.push(setTimeout(()=>{
          setVisibleChars(prev=>{const next=[...prev];next[li]=c;return next;});
        },offset+c*45));
      }
      offset+=line.length*45+900;
    });
    allTimers.push(setTimeout(()=>setBtn(true),offset));
    return()=>allTimers.forEach(clearTimeout);
  },[]);

  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",padding:"40px 24px"}}>
      <div style={{maxWidth:320,width:"100%"}}>
        {LOADING_LINES.map((l,i)=>{
          if(i>activeLine)return null;
          const chars=visibleChars[i];
          const text=l.slice(0,chars);
          const isDone=chars>=l.length;
          const isLast=i===2;
          return(
            <div key={i} style={{
              fontFamily:isLast?"'Noto Serif SC',serif":"'Press Start 2P',monospace",
              fontSize:isLast?"clamp(18px,5vw,24px)":8,
              color:isLast?"#e8e0d0":"#4a4840",
              marginBottom:isLast?40:14,fontWeight:isLast?300:400,
              lineHeight:isLast?1.8:2.4,letterSpacing:isLast?0:1,
              textShadow:isLast?"-2px 0 #ff00ff, 2px 0 #00ffff":"1px 0 rgba(0,255,255,0.2)",
            }}>
              {text}
              {i===activeLine&&!isDone&&(
                <span style={{color:"#c9a84c",textShadow:"0 0 8px rgba(201,168,76,.7)",
                  animation:"blink .5s step-end infinite"}}>█</span>
              )}
              {isDone&&(
                <span style={{color:"#c9a84c",opacity:.4,
                  animation:"blink .8s step-end infinite"}}>█</span>
              )}
            </div>
          );
        })}
        {btn&&(
          <button onClick={onDone} style={{
            fontFamily:"'Press Start 2P',monospace",fontSize:9,color:"#080C0A",
            background:"#c9a84c",border:"none",padding:"14px 28px",cursor:"pointer",
            boxShadow:"4px 4px 0 #7a6020, 0 0 12px rgba(201,168,76,.4)",
            animation:"fadeUp .6s ease both",letterSpacing:1,textTransform:"uppercase",
          }}>
            查看我的结局 →
          </button>
        )}
      </div>
    </div>
  );
}

function Result({main,intuition,consistent}){
  const[showSub,setShowSub]=useState(false);
  const[glitch,setGlitch]=useState(true);
  const r=RESULTS[main];
  const sub=RESULTS[r.subKey];
  useEffect(()=>{const t=setTimeout(()=>setGlitch(false),3200);return()=>clearTimeout(t);},[]);
  const TIER_COL={"困局":"#7eb8c9","伪好局":"#c9a84c","标准局":"#8ab4c0",
    "隐藏局":"#c9a0dc","好局":"#c9a84c","普通局":"#8ab4c0","特殊局":"#c9a0dc"};
  const tc=TIER_COL[r.tier]||r.acc;
  return(
    <div style={{minHeight:"100vh",position:"relative",overflow:"hidden",
      background:"radial-gradient(ellipse at 20% 50%,rgba(126,184,201,.06) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(201,160,220,.06) 0%,transparent 50%)",
    }}>
      <PixelStars n={44}/>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(126,184,201,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(126,184,201,.025) 1px,transparent 1px)",
        backgroundSize:"36px 36px"}}/>
      <div style={{position:"relative",zIndex:1,maxWidth:480,margin:"0 auto",padding:"40px 24px 80px"}}>

        {/* Badge - game achievement popup */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:22,
          animation:"badgeSlideIn .8s cubic-bezier(.34,1.56,.64,1) .1s both"}}>
          <div className={r.px} style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,
            color:r.acc,padding:"8px 14px",letterSpacing:1,lineHeight:1.9,textAlign:"center",
            textTransform:"uppercase",textShadow:`0 0 8px ${r.acc}99`,
            boxShadow:`3px 3px 0 rgba(0,0,0,.4), 0 0 12px ${r.acc}44`}}>
            🏆  {r.badge}
          </div>
        </div>

        {/* Tier */}
        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:8,color:tc,
          textAlign:"center",letterSpacing:3,marginBottom:10,animation:"fadeIn .6s ease .3s both",
          textTransform:"uppercase",textShadow:`0 0 8px ${tc}88`}}>
          {r.tier} · {r.symbol}
        </div>

        {/* Title with heavy glitch */}
        <h1 style={{fontFamily:"'Noto Serif SC',serif",fontSize:"clamp(28px,8vw,44px)",
          fontWeight:500,color:"#e8e0d0",textAlign:"center",marginBottom:28,lineHeight:1.3,
          animation:glitch
            ?"glitchHeavy 1.2s ease infinite,fadeUp .8s ease .4s both"
            :"fadeUp .8s ease .4s both",
          textShadow:glitch?undefined:"-2px 0 #ff00ff, 2px 0 #00ffff"}}>
          {r.role}
        </h1>

        {/* Divider */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:28,animation:"fadeIn .6s ease .5s both"}}>
          <div style={{flex:1,height:1,background:`linear-gradient(90deg,transparent,${r.acc}40,transparent)`}}/>
          <span style={{fontFamily:"'Press Start 2P',monospace",fontSize:8,color:r.acc,opacity:.6,
            textShadow:`0 0 6px ${r.acc}88`}}>✦</span>
          <div style={{flex:1,height:1,background:`linear-gradient(90deg,transparent,${r.acc}40,transparent)`}}/>
        </div>

        {/* Result image with CRT overlay */}
        <div className={r.px} style={{
          width:"100%",background:"rgba(8,12,10,.6)",
          marginBottom:28,animation:"fadeUp .8s ease .5s both",
          position:"relative",overflow:"hidden",
        }}>
          <img src={r.img} alt={r.role} style={{
            width:"100%",display:"block",
            imageRendering:"pixelated",
          }}/>
          <div style={{position:"absolute",inset:0,pointerEvents:"none",
            background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.12) 2px,rgba(0,0,0,.12) 4px)",
            mixBlendMode:"multiply"}}/>
          <div style={{position:"absolute",inset:0,pointerEvents:"none",
            background:"radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,.45) 100%)"}}/>
          {[[0,0,0,0],[1,0,"right",0],[0,1,0,"bottom"],[1,1,"right","bottom"]].map(([_,__,h,v],i)=>(
            <div key={i} style={{position:"absolute",[h||"left"]:0,[v||"top"]:0,
              width:14,height:14,background:r.acc,opacity:.5}}/>
          ))}
        </div>

        {/* Body text */}
        <div style={{animation:"fadeUp .8s ease .7s both"}}>
          {r.body.map((p,i)=>(
            <p key={i} style={{
              fontFamily:"'Noto Serif SC',serif",
              fontSize:"clamp(14px,3.5vw,16px)",
              color:i===r.body.length-1?"#d8d0c0":"#6a6058",
              lineHeight:2.05,marginBottom:18,
              fontWeight:i===r.body.length-1?400:300,
              textShadow:"1px 0 rgba(0,255,255,0.15)",
            }}>{p}</p>
          ))}
        </div>

        {/* Music player */}
        <div style={{animation:"fadeUp .8s ease .9s both"}}>
          <MusicPlayer acc={r.acc} autoPlay/>
        </div>

        {/* Intuition compare */}
        {intuition!=null&&(
          <div style={{marginTop:28,padding:"16px 18px",border:"2px solid #1e1c18",
            animation:"fadeUp .8s ease 1s both"}}>
            <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,
              color:"#2e2c28",letterSpacing:1,marginBottom:10,textTransform:"uppercase",
              textShadow:"0 0 4px rgba(201,168,76,.3)"}}>直觉 VS 结果</div>
            <p style={{fontFamily:"'Noto Sans SC',sans-serif",fontSize:12,
              color:"#4a4840",lineHeight:1.8,marginBottom:8,
              textShadow:"1px 0 rgba(0,255,255,0.1)"}}>
              直觉：{ITN_OPTS[intuition].t}
            </p>
            <p style={{fontFamily:"'Noto Serif SC',serif",fontSize:13,
              color:consistent?"#7eb8c9":"#c9a84c",lineHeight:1.8,
              textShadow:consistent?"0 0 6px rgba(126,184,201,.4)":"0 0 6px rgba(201,168,76,.4)"}}>
              {consistent
                ?"你的直觉和结果一致。你心里其实知道答案，只是还没有准备好说出来。"
                :"你的直觉和结果不一样。你想走那条路，但你现在的状态把你推向了另一个方向。这个落差本身，可能比结局更值得你想一想。"}
            </p>
          </div>
        )}

        {/* Sub result */}
        <div style={{marginTop:20,animation:"fadeUp .8s ease 1.1s both"}}>
          <button onClick={()=>setShowSub(!showSub)} style={{
            width:"100%",background:"transparent",border:"2px solid #1e1c18",
            padding:"13px 18px",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"space-between",
            transition:"all .15s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="4px 0 0 0 #c9a84c,-4px 0 0 0 #c9a84c,0 4px 0 0 #c9a84c,0 -4px 0 0 #c9a84c";e.currentTarget.style.borderColor="#c9a84c";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="#1e1c18";}}>
            <span style={{fontFamily:"'Noto Sans SC',sans-serif",fontSize:13,color:"#5a5248",
              textShadow:"1px 0 rgba(0,255,255,0.1)"}}>
              如果你当初选了另一条路……
            </span>
            <span style={{fontFamily:"'Press Start 2P',monospace",fontSize:8,color:"#3a3530",
              textShadow:"0 0 4px rgba(201,168,76,.3)"}}>
              {showSub?"▲":"▼"}
            </span>
          </button>
          {showSub&&(
            <div style={{border:"2px solid #1e1c18",borderTop:"none",
              padding:"18px 18px",animation:"fadeUp .4s ease both"}}>
              <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,
                color:sub.acc,letterSpacing:1,marginBottom:10,textTransform:"uppercase",
                textShadow:`0 0 6px ${sub.acc}88`}}>
                {sub.tier} · {sub.role}
              </div>
              <p style={{fontFamily:"'Noto Serif SC',serif",fontSize:13,
                color:"#5a5248",lineHeight:1.9,fontWeight:300,
                textShadow:"1px 0 rgba(0,255,255,0.1)"}}>
                {r.subText}
              </p>
            </div>
          )}
        </div>

        {/* Restart */}
        <div style={{textAlign:"center",marginTop:44,animation:"fadeIn .8s ease 1.3s both"}}>
          <button onClick={()=>window.location.reload()} style={{
            fontFamily:"'Press Start 2P',monospace",fontSize:8,color:"#2e2c28",
            background:"transparent",border:"none",cursor:"pointer",
            letterSpacing:1,textDecoration:"underline",textTransform:"uppercase",
            textShadow:"0 0 4px rgba(201,168,76,.3)",
          }}>重新测试</button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────
async function saveResult(answers, result, scores, intuition) {
  try {
    await supabase.from('quiz_results').insert({
      intuition,
      answers,
      result,
      scores,
      device: window.innerWidth < 768 ? 'mobile' : 'desktop'
    })
  } catch(e) {
    // silent fail
  }
}

export default function App(){
  const[screen,setScreen]=useState("intro");
  const[intuition,setIntuition]=useState(null);
  const[qi,setQi]=useState(0);
  const[answers,setAnswers]=useState({});
  const[showCh,setShowCh]=useState(false);
  const[nextCh,setNextCh]=useState(null);
  const[result,setResult]=useState(null);
  const[consistent,setConsistent]=useState(false);
  const[burst,setBurst]=useState(false);
  const pendingAction=useRef(null);

  const cur=QS[qi];

  const transition=useCallback((action)=>{
    pendingAction.current=action;
    setBurst(true);
  },[]);

  const onBurstDone=useCallback(()=>{
    setBurst(false);
    if(pendingAction.current){pendingAction.current();pendingAction.current=null;}
  },[]);

  const handleAnswer=optIdx=>{
    const na={...answers,[cur.id]:optIdx};
    setAnswers(na);
    const ni=qi+1;
    if(ni>=QS.length){saveResult(na,score(na).main,score(na),intuition);transition(()=>setScreen("loading"));return;}
    const nq=QS[ni];
    if(nq.ch!==cur.ch){
      transition(()=>{
        setNextCh(nq.ch);setShowCh(true);
        setTimeout(()=>{setShowCh(false);setQi(ni);},2400);
      });
    }else{setQi(ni);}
  };

  const showResult=()=>{
    const r=score(answers);
    setResult(r.main);setConsistent(r.consistent);
    transition(()=>setScreen("result"));
  };

  return(
    <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",position:"relative"}}>
      <GlobalStyles/>
      <CRTNoise/>
      <div className="crt-overlay"/>
      <div className="crt-vignette"/>
      <div className="crt-scan"/>
      <StaticBurst active={burst} onDone={onBurstDone}/>
      <div className="flicker" style={{position:"relative",zIndex:2}}>
        {screen==="intro"&&<Intro onStart={()=>transition(()=>setScreen("intuition"))}/>}
        {screen==="intuition"&&<Intuition onSelect={i=>{setIntuition(i);transition(()=>setScreen("quiz"));}}/>}
        {screen==="quiz"&&(
          showCh
            ?<ChapterCard ch={nextCh} onDone={()=>{}}/>
            :<Question qi={qi} q={cur} onAnswer={handleAnswer}/>
        )}
        {screen==="loading"&&<Loading onDone={showResult}/>}
        {screen==="result"&&result&&<Result main={result} intuition={intuition} consistent={consistent}/>}
      </div>
    </div>
  );
}
