async function generateRickroll(){
    const url = encodeURI(document.getElementById("title").value);
    const desc = document.getElementById("description").value;
    const title  = document.getElementById("title").value;
    const ImgUrlValue = document.getElementById("ImgUrl").value;
    const urlCont = document.getElementById("rr-link");
    const dataLinkElement = document.getElementById("stats-link");
    const type = document.getElementById("type").value;

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url, 
            title: title, 
            description: desc,
            type: type,
            ImgUrl: ImgUrlValue
        }),
    };
    response = await fetch('/gen/rr' , options)
        .then ((response) => {
            if (response.ok){
                return response.json()
            } else {
                //errorDIV.innerHTML = "" todo
                throw new Error(`Server responded with ${response.status} -_-`)
            }
        })
        .catch(error => console.log(error) );

    urlCont.innerHTML = `${document.location.origin}/${type}/${response.url}`
    urlCont.setAttribute('href', `${document.location.origin}/${type}/${response.url}`)

    const dataLink = `${document.location.origin}/data?url=${response.url}`
    dataLinkElement.innerHTML = dataLink
    dataLinkElement.setAttribute('href' , dataLink)
}