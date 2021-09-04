async function generateRickroll(){
    const url = document.getElementById("title").value;
    const urlCont = document.getElementById("rr-link");
    const dataLinkElement = document.getElementById("stats-link");
    const type = document.getElementById("type").value;

    urlCont.innerHTML = `${document.location.origin}/${type}/${url}`
    urlCont.setAttribute('href', `${document.location.origin}/${type}/${url}`)

    const dataLink = `${document.location.origin}/data?url=${document.location.origin}/${type}/${url}`
    dataLinkElement.innerHTML = dataLink
    dataLinkElement.setAttribute('href' , `${document.location.origin}/data?url=${document.location.origin}/${type}/${url}`)
}