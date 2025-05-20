
import JobList from "../components/jobs";
import Header from "../components/Header";

const Home =() =>{

    return (
        <div className="p-2 bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200">
            <Header />
            <section>
                <JobList />
            </section>
        </div>
    )
}

export default Home;