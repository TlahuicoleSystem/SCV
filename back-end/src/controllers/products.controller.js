export const findAllProducts = (req, res) => {
    let response = null
    let status = null
    try {
        response = {
            succes: true,
            data: [],
            message: "List product"
        }
        status = 200
    } catch (e) {
        response = {
            succes: false,
            data: null,
            message: "not found List product"
        }
        status = 400
    }
    res.status(status)
    res.json(response)
}