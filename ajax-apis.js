import axios from "axios";

const baseURL = "https://www.upmedia.mg";

/**
 * Get home page HTML
 * @returns {String} - Raw HTML content
 */
export const HomePage = () => {
    return new Promise( (resolve, reject) => {
        axios({
            baseURL,
            url: "/",
            method: "GET",
        }).then( (r) => resolve(r) ).catch( error => reject(error) );
    } );
};

/**
 * Get search page HTML
 * @param {String} sh_keyword - The keyword for the `sh_keyword` param in `base.url/search.php`.
 * @returns {String} - Raw HTML content
 */
export const SearchPage = (sh_keyword, currentPage = "1") => {
    return new Promise( (resolve, reject) => {
        axios({
            baseURL,
            method: "GET",
            url: "/search.php",
            params: {
                sh_keyword,
                currentPage
            }
        }).then( (r) => resolve(r) ).catch( error => reject(error) );
    } );
};

/**
 * Get Article HTML
 * @param {String} SerialNo 
 * @param {String} Type 
 * @returns 
 */
export const ArticlePage = (SerialNo = "2", Type = "") => {
    return new Promise( (resolve, reject) => {
        axios({
            baseURL,
            method: "GET",
            url: "/news_info.php",
            params: {
                SerialNo,
                Type
            }
        }).then( (r) => resolve(r) ).catch( error => reject(error) );
    } );
};