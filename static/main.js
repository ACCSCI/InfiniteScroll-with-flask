console.log('main.js is loaded!');
const scroller = document.querySelector('#scroller');
const template = document.querySelector('#post_template');

const loaded = document.querySelector('#loaded');

const sentinel = document.querySelector('#sentinel');
let counter = 0;

function loadItems(){
    

    fetch(`/load?c=${counter}`)
    .then(response=>{
        if(!response.ok){
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data=>{
        if(!data.length){
            sentinel.innerHTML="No more posts";
        }
        for(let i =0;i<data.length;i++){
            // let template_clone = document.importNode(template.content,true);
            let template_clone=template.content.cloneNode(true);
            template_clone.querySelector('#title').innerHTML=`${data[i][0]}:${data[i][1]}`;
            template_clone.querySelector('#content').innerHTML=data[i][2];
            scroller.appendChild(template_clone);
            counter +=1;
            loaded.innerHTML = `${counter} items loaded`;
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
}

let intersectionObserver = new IntersectionObserver(entries=>{
    //If intersectionRatio is 0, the sentinel is out of view and we do not need to do anything.
    if(entries[0].intersectionRatio<=0){
        return;
    }
    loadItems();
});
intersectionObserver.observe(sentinel);