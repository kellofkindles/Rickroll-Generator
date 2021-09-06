function generateRickroll(){
    const url = encodeURI(document.getElementById("title").value);
    const desc = document.getElementById("description").value;
    const title  = document.getElementById("title").value;
    const ImgUrlValue = document.getElementById("ImgUrl").value;
    const urlCont = document.getElementById("rr-link");
    const dataLinkElement = document.getElementById("stats-link");
    const type = document.getElementById("type").value;

    urlCont.innerHTML = `${document.location.origin}/${type}/${url}`
    urlCont.setAttribute('href', `${document.location.origin}/${type}/${url}`)

    const dataLink = `${document.location.origin}/data?url=${document.location.origin}/${type}/${url}`
    dataLinkElement.innerHTML = dataLink
    dataLinkElement.setAttribute('href' , `${document.location.origin}/data?url=${document.location.origin}/${type}/${url}`)

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url, 
            title: title, 
            description: desc,
            ImgUrl: ImgUrlValue
        }),
    };
    fetch('/gen/rr' , options)
        .catch(error => console.log(error) );
}