const text = document.querySelectorAll(".textHead");
const allThumbnails = document.querySelectorAll(".thumbnail");
const textContainer = document.querySelector(".text-container");
const allMoveables = document.querySelectorAll(".moveables");

function textChange(event) {
    if(event === 'mouseover') {
        text.forEach(element => {
            element.setAttribute('fill', 'none');
            element.style.opacity = '0.3';
            element.setAttribute("stroke-width", '1px');
        });
        textContainer.style.zIndex = '-1';
    } else {
        text.forEach(element => {
            element.setAttribute('fill', 'white');
            element.style.opacity = '1';
            element.setAttribute("stroke-width", '0px');
        });
        textContainer.style.zIndex = '3';
    }
}

function followMouse(e, img, discs) {


    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const moveX = (x / rect.width - 0.5) * 2; 
    const moveY = (y / rect.height - 0.5) * 2; 
    
    img.style.transition = 'transform 0.1s ease-out';
    img.style.transform = `translate(${moveX * 50}%, ${moveY * 50}%)`;
    
    discs.forEach(disc => {disc.style.display = 'block';})
    
    allMoveables.forEach(moveables => {
        if(moveables != img)
        {
            moveables.children[0].style.display = 'none';
        }

    });

}


function resetPosition(img, discs) {
    img.style.transition = 'transform 0.5s ease-out';
    img.style.transform = 'translate(0, 0)';

    discs.forEach(disc => {disc.style.display = 'none';})

    allMoveables.forEach(moveables => {
            moveables.children[0].style.display = 'block';
    });
}





allThumbnails.forEach(thumbnail => {
    const img = thumbnail.querySelector('.moveables');
    const discs = thumbnail.querySelectorAll('.descriptionText');
    
    // Mouse enter/leave for text effect
    thumbnail.addEventListener("mouseover", (e) => {
        textChange(e.type);
    });
    
    thumbnail.addEventListener("mouseout", (e) => {
        textChange();
        resetPosition(img, discs);
    });
    
    // Mouse move for image following
    thumbnail.addEventListener("mousemove", (e) => {
        followMouse(e, img, discs);
    });
});