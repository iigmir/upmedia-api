export default (document) => {
    const navigation = {};
    if( document.querySelector(".other .prev img") != null ) {
        navigation.prev = {
            text: document.querySelector(".other .prev dd").textContent ?? "",
            link: document.querySelector(".other .prev").attributes.href ?? "",
            image: document.querySelector(".other .prev img").attributes.img ?? "",
        };
    }
    if( document.querySelector(".other .next img") != null ) {
        navigation.next = {
            text: document.querySelector(".other .next dd").textContent ?? "",
            link: document.querySelector(".other .next").attributes.href ?? "",
            image: document.querySelector(".other .next img").attributes.img ?? "",
        };
    }
    return navigation;
}
