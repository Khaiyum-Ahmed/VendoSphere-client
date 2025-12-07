import UseAuth from "../../../hooks/UseAuth";

const Home = () => {
    const {user} = UseAuth()
    console.log(user)
    return (
        <div>
            <h1>home page</h1>
        </div>
    );
};

export default Home;