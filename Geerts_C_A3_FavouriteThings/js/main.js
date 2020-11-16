// import your packages here
import { fetchData, postData } from "./modules/DataMiner.js";

(() => {
    // fetch('./DataSet.json')
    //     .then(res.json())
    //     .then(data => {
    //         handleDataSet(data);
    //     })
    //     .catch((error) => console.log(error));
    // stub * just a place for non-component-specific stuff

    const lightbox = document.querySelector(".lightbox-con")
    
    function popErrorBox(message) {
        alert(message);
    }

    function handleDataSet(data) {
        // populate a lightbox with this data & open it
        let lightbox = document.querySelector(".lightbox");
        // let userSection = document.querySelector('.user-section'),
        //    userTemplate = document.querySelector('#user-template').content;

        for (let user in data) {
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;

            currentUserText[1].src = `images/${data[user].Image}`;
            currentUserText[2].textContent = data[user].Name;
            currentUserText[3].textContent = data[user].Description;

            // add this new user to the view
            userSection.appendChild(currentUser);
        }
    }

    function closeLightbox(event) {
        lightbox.classList.toggle("lightbox-con-disabled")
    }

    function lightboxEvent(event) {
        lightbox.classList.toggle("lightbox-con-disabled")
        console.log(event.target.src)

        lightbox.querySelector('.lightbox-image').src = event.target.src
    }

    function retrieveProjectInfo(event) {
        // check for an ID, if none then don't try fetch call
        // because it would break

        if (!event.target.id) { return }
        
        fetchData(`./includes/index.php?id=${event.target.id}`).then(
            (data) => {
                console.log(data);
                renderThumbnails(data);
            }
        ).catch(err => { console.log(err); popErrorBox(err); });
    }

    function removeChildNodes(node) {
        while (node.firstChild) {
            node.removeChild(node.lastChild);
        }
    }
    
    function renderThumbnails(thumbs) {
        let userSection = document.querySelector('.user-section'),
            userTemplate = document.querySelector('#user-template').content;

        removeChildNodes(userSection);

        for (let user in thumbs) {
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;

            currentUserText[1].src = `images/${thumbs[user].Image}`;
            currentUserText[1].id = thumbs[user].Image;
            currentUserText[2].textContent = thumbs[user].Name;
            currentUserText[3].textContent = thumbs[user].Description;
            // add this new user to the view
            userSection.appendChild(currentUser);
            
        }
            userSection.addEventListener("click", lightboxEvent);
    }
    
    // we can add a catch handler to a thenable if things go wrong during our data retrieval attempt
    // really, we should move all of this to an external class or function and pass arguments into it.
    // that would make it really flexible and able to handle all kinds of requests and we could pass in
    // a callback depending on what we want to do with our data but then we'd be on our way to rewriting

    fetchData("./includes/index.php").then((data) =>  {
        renderThumbnails(data);
    }).catch(err => { console.log(err); });

    document.querySelectorAll('.nav-item a').forEach(
        (navButton) => {
            navButton.addEventListener('click', retrieveProjectInfo);
        });

    lightbox.addEventListener("click", closeLightbox)
})();