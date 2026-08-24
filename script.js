(function(){
  const EMOJI_BANK=['🦊','🐢','🍄','🎈','🪁','🐝','🍩','🦋','🧩','🐙','🌵','🍒','🎲','🐧','🍉','🦕','🧸','🪀','🐬','🍋'];
  const NAMES={'🦊':'a fox','🐢':'a turtle','🍄':'a mushroom','🎈':'a balloon','🪁':'a kite','🐝':'a bee','🍩':'a donut','🦋':'a butterfly','🧩':'a puzzle piece','🐙':'an octopus','🌵':'a cactus','🍒':'cherries','🎲':'a die','🐧':'a penguin','🍉':'watermelon','🦕':'a dinosaur','🧸':'a teddy bear','🪀':'a yo-yo','🐬':'a dolphin','🍋':'a lemon'};
  const capRow=document.getElementById('capRow');
  const capCheck=document.getElementById('capCheck');
  const capLabel=document.getElementById('capLabel');
  const spinner=document.getElementById('spinner');
  const overlay=document.getElementById('overlay');
  const grid=document.getElementById('grid');
  const targetWord=document.getElementById('targetWord');
  const dotsEl=document.getElementById('dots');
  const verifyBtn=document.getElementById('verifyBtn');
  const reloadBtn=document.getElementById('reloadBtn');
  const flash=document.getElementById('flash');
  const submitBtn=document.getElementById('submitBtn');
  const verifiedNote=document.getElementById('verifiedNote');
  const verifiedText=document.getElementById('verifiedText');

  const TOTAL_ROUNDS= 3;
  let round=0;
  let misses=0;
  let target=null;
  let selected=new Set();
  let locked=false;

  capRow.addEventListener('click',()=>{
    if(capRow.dataset.done)return;
    capRow.style.cursor='default';
    spinner.style.display='block';
    capLabel.textContent='Checking…';

    setTimeout(()=>{
      spinner.style.display='none';
      capLabel.textContent ="I am not a robot!!";
      openChallenge();
    },900+Math.random()*500);
  });

  function buildDots(){
    dotsEl.innerHTML='';
    for(let i=0;i<TOTAL_ROUNDS;i++){
      const d=document.createElement('div');
      d.className='pd'+(i<round-1 ?' done': i === round-1 ?' active':'');
      dotsEl.appendChild(d);
    }
  }
  function openChallenge(){
    round=0;
    misses=0;
    overlay.classList.add('show');
    nextRound();
  }
  function nextRound(){
    round++;
    flash.classList.remove('show');
    buildDots();
    if(round>TOTAL_ROUNDS){
      return closeSuccess();
    }
    selected=new Set();
    locked=false;
    verifyBtn.disabled=false;
    grid.innerHTML='';

    const shuffled=[...EMOJI_BANK].sort(()=>Math.random()-0.5);
    target=shuffled[0];
    const count=Math.min(2+round,4);
    let pool=[];
    for(let i=0;i<count;i++)pool.push(target);
    while(pool.length<9){
      const e=shuffled[1+Math.floor(Math.random()*(shuffled.length-1))];
      if(e!==target)pool.push(e);
    }
    pool.sort(()=>Math.random()-0.5);
    targetWord.textContent=NAMES[target];

    pool.forEach((emoji)=>{
      const t=document.createElement('div');
      t.className='tile';
      t.dataset.emoji=emoji;
      t.innerHTML=emoji+'<div class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>';
      t.addEventListener('click',()=>{
        if(locked)return;
        t.classList.toggle('sel');
        if(t.classList.contains('sel'))selected.add(t);else selected.delete(t);
      });
      grid.appendChild(t);
    });
  }
  reloadBtn.addEventListener('click',()=>{ if(!locked) nextRound();});

  verifyBtn.addEventListener('click',()=>{
    if(locked)return;
    locked=true;
    verifyBtn.disabled=true;

    const tiles=[...grid.children];
    let ok=true;
    tiles.forEach(t=>{
      const isTarget=t.dataset.emoji===target;
      const isSel=selected.has(t);
      if(isTarget && isSel)t.classList.add('result-ok');
      else if(!isTarget && isSel)t.classList.add('result-bad');
      else if(isTarget && !isSel)t.classList.add('result-miss');
      if(isTarget!==isSel)ok=false;
    });

    setTimeout(()=>{
      if(ok){
        nextRound();
      }else{
        misses++;
        flash.classList.add('show');
        if(misses>=3){
          flash.textContent='Too many misses — starting over';
          setTimeout(()=>{round=0;misses=0;nextRound();},900);
        }else{
          setTimeout(()=>{nextRound();},700);
        }
      }
    },550);
  });

  function closeSuccess(){
    overlay.classList.remove('show');
    capRow.dataset.done='1';
    capCheck.classList.add('checked');
    capLabel.textContent = "I am not a robot!!";
    submitBtn.classList.add('active');
    verifiedNote.classList.add('show');
    verifiedText.textContent='Verification complete';
  }

  submitBtn.addEventListener('click',()=>{
    if(!submitBtn.classList.contains('active'))return;
    submitBtn.textContent='Signed in';
    submitBtn.style.opacity='0.7';
  });
})();