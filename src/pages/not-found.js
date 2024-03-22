import { FileSearch } from '@phosphor-icons/react/dist/ssr';

const NotFound = () => {
    const handleReload = () =>{
        window.location.reload()
    }
    
    return (
        <div>
            <div className='not-found'>
                <FileSearch size={50}/>
                <h1>NOT FOUND</h1>
            </div>
            <a href="/" className='back-button' onClick={handleReload}>Back</a>
        </div>
    );
}

export default NotFound;
