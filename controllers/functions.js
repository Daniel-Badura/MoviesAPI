// jshint esversion: 9
fetchMovie =(title) =>  axios
.get(`http://www.omdbapi.com/?apikey=f7196b6c&t=${title}`)
.then(response => response.data)
.catch(err => 'error'),



  Movie.countDocuments({ Title: data.Title }, (err, count) => {
    if (count == 0) {
      if (data.Released == "N/A") {
        data.Released = Date.now();
      }
      data.monthAdded = date;
      data.addedBy = user.name;
      Movie.create(data);
      res.status(201).json({
        success: true,
        msg: `added movie ${data.Title}`,
        data: data,
      });
    } else if (count > 0) {
      res
        .status(403)
        .json({ success: false, msg: "Movie already exists" });
    }});



  