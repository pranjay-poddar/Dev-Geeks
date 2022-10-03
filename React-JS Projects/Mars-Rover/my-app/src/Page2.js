import React from "react";
class Page_2 extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false
		};
	}

	// ComponentDidMount
	// Using Lifecycle Method to fetch data from API
	componentDidMount() {
		fetch(
"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=tcg4xTn9KhW1ehDkkS4uW1tDGbd2d0uNBQF2xZFp")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json,
					DataisLoaded: true
				});
			})
	}

	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1></h1> </div> ;

		return (
		<div className = "page_2">
			<h1 style={{textAlign:"center"}}>Mast Camera</h1> 
      {
		//Mapping the JSON object to convert it into an array and render it on the webpage
		items.photos.map((item)=> (<p key={item.id}><img src={item.img_src} alt="" /></p>))
      }
		</div>
	);
}
}



export default Page_2;
