import './NavButton.css'

const NavButton = () => {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
    {/* adicionar lógica das páginas */ }
    return (
        <div className='container'>
            {/* adicionar e linkar o botão */}
            <button type='button' onClick={handleClick} className='btn'>
                {/* colocar a variável do icone da página local */}
                <img src="src\assets\images\Home-icon.png" alt="page-icon" className='btn-iconPage' />
                {/* colocar a variável do nome da página local */}
                <p className='btn-textPage'>Home</p>
            </button>
        </div>
    )
}

export default NavButton