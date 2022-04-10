export const NoParamGiven = (req, res) => {
    res.status(400);
    res.jsonp({
        error: "No essential parameters given",
    });
};
