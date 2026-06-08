
const UseLoading = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

   return loading;
};


const MyComponent = () => {
    const isLoading = UseLoading();

    return (
        <div>
            {isLoading ? <h1>Loading...</h1> : <h1>Data Loaded!</h1>}
        </div>
    );
}