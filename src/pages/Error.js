import { Link, useNavigate, useRouteError } from "react-router-dom";
// library
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    // console.log(error.message);
    return (
        <div className="error">
            <h1>Uh oh! We've got a Problem!</h1>
            <p>{error.message || error.statusText}</p>
            <div className="flex-md">
                <button className="btn btn--dark" onClick={() => { navigate(-1) }}>
                    <ArrowUturnLeftIcon width={20} />
                    <span>Go Back</span>
                </button>

                <Link className="btn btn--dark" to="/">
                    <span>Go home</span>
                    <HomeIcon width={20} />
                </Link>
            </div>
        </div>
    );
}

export default Error;