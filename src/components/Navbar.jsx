import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-dark bg-dark mb-3">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-secondary">Todos</button>
						
					</Link>
										<Link to="/Addcontact">
						<button className="btn btn-secondary m-2">Add Contact</button>
						
					</Link>
				</div>
			</div>
		</nav>
	);
};
