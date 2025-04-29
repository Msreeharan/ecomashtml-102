import findDistanceAndTime from"../service/distance.service.js";

const atob = async (req,res) => {
    const [origin,,destination] = req.params?.id?.split("-")
    const response=  await findDistanceAndTime(origin,destination)
    let distance = Math.max(response?.distance, 130)
    const data = {
        ...response,
        sedanPrice: (distance*14)+400,
        suvPrice: (distance*18)+500,
    }
    res.render("atob", { data })
}

export default atob;