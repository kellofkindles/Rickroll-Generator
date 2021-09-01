function generateRickroll(){
    const url = document.getElementById("title").value;
    const urlCont = document.getElementById("rr-link");

    urlCont.innerHTML = `${document.location.origin}/posts/${url}`
    urlCont.setAttribute('href', `${document.location.origin}/posts/${url}`)
}