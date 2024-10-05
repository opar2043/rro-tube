function loadBtnData(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => makeBtnData(data.categories))
     .catch(err => console.error(err))

}

// function video   

function makeVideoDisplay(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => makeVideoData(data.videos))
    .catch(err => console.error(err))
}


// timing function

function timeScreen(time){
    
    let hour =parseInt(time /3600) ;
    let remnaiSec =parseInt(time % 60) ;
    let Sec =parseInt(hour % 60) ;

    return `${hour} h ${remnaiSec}m ${Sec}s`
}




// make front btn

function makeBtnData(categories){
     let div = document.getElementById('btnDiv');

     categories.map(item => {
        // console.log(1);
        const btn = document.createElement('button');
        btn.classList.add('btn','cata-btn')
        btn.setAttribute('id',`btn- ${item.category_id}`)
        btn.addEventListener('click',()=>{
            showbtnVideo(item.category_id)

         

        })
        // console.log(btn);

        btn.innerText = item.category;       
        div.appendChild(btn)
    });
}

// show res video


function showbtnVideo(id){
    // alert(id) 
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {

        // remove btn
        btnRemove()

        // make bg btn

        let activeBtn = document.getElementById(`btn- ${id}`)
        activeBtn.classList.add('btnac')
        console.log(activeBtn);
        makeVideoData(data.category)
    })
    .catch(err => console.error(err))

}
   
// display videos

function makeVideoData(videos){
    // console.log(videos);
    let vid = document.getElementById('video');
    vid.innerHTML = " "

    if(videos.length === 0){
        vid.classList.remove('grid')
        vid.innerHTML = `
              <div class="text-2xl font-bold mx-auto  justify-center w-1/3">
                   <img src="img/Logo.png" alt="">
                    <h1>No videos Here</h1>
              </div>
        `
        return;
    }else{
        vid.classList.add('grid')

    }


    videos.map((video) => {
        // console.log(video);
        const div = document.createElement('div');
        div.classList.add('shadow')
        div.innerHTML = `
           
      <figure  class="w-[full]  h-[200px] relative">
          <img
          src= ${video.thumbnail} class="w-full object-cover h-full rounded-md"/>
           ${
                video.others.posted_date?.length === 0 ? " " : `<span class="absolute bottom-2 right-4 bg-black text-xs text-white rounded-xl  p-1"> 
                          
                ${timeScreen( video.others.posted_date)}        
                </span>`
            } 
            
      </figure>
      <div class="px-2 py-4 flex gap-2 flex-row items-center">
        <div  class="">
               <img class="w-10 rounded-full object-cover" src=${video.authors[0].profile_picture}>
        </div>          

        <div >
              <h2 class="card-title">${video.title}</h2>
               
                <div class="flex items-center gap-2">
                     <p class="text-sm">${video.authors[0].
                        profile_name}</p>
                    
                        ${video.authors[0].verified === true ? `<img class="w-5" src='https://img.icons8.com/?size=50&id=123575&format=png'> `: ""}
                     
                </div>
                <p class="text-sm">${video.others.views}</p>
                <button onclick="showVideoDetails('${video.video_id}')" class= "btn btn-xs bg-red-400">Details</button> 
        </div>
                  
        </div>
        
      </div>
     
    </div>
        `
    vid.appendChild(div)

    })
       
}

// show details

function showVideoDetails(videoId){
       console.log(videoId);
       fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
       .then(res => res.json())
       .then(data => modalFunction(data.video.category_id))
}

// modal section

function modalFunction(mod){
     console.log(mod);
     document.getElementById('modalBtn').click()



}


function btnRemove(){
    let clsBtn = document.getElementsByClassName('cata-btn')
    console.log(clsBtn);
    for(let btn of clsBtn){
        btn.classList.remove('btnac')
    }
}



document.getElementById('inputValue').addEventListener('keyup',(event)=>{
    // let input = document.getElementById('inputValue');
    console.log(event.target.value);
    searchInput(event.target.value);
})

function searchInput(text = ''){
  console.log(text);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${text}`)
  .then(res => res.json())
  .then(data => makeVideoData(data.videos))
}





loadBtnData()
makeVideoDisplay()
modalFunction()