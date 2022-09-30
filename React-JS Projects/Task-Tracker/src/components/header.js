import Button from './Button';

const Header = ({ontoggle,showAdd}) => {
    return(
        <header className='header'>
            <h1>TASK TRACKER</h1>
            <Button color='black' text={showAdd?'Close':'Add'} onClick={ontoggle}/>
        </header>
    )
}

export default Header;