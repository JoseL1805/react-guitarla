import { Header, Guitar, Footer } from './components'
import { db } from './data/db'
import './App.css'
import { useEffect, useState } from 'react'


function App() {

	const initialCart = () => {
		const localStorageCart = localStorage.getItem('cart')
		return localStorageCart ? JSON.parse(localStorageCart) : [];
	}
	const [data, setData] = useState(db);
	const [cart, setCart] = useState(initialCart)

	const MAX_ITEMS = 5
	const MIN_ITEMS = 0

	useEffect( ()=>{
		localStorage.setItem('cart', JSON.stringify(cart ?? '[]') )
	},[cart])

	const addToCart = (item) => {
		const itemExist = cart.findIndex( (guitar) => guitar.id === item.id );
		if( itemExist >= 0) {
			if(cart[itemExist].quantity >= MAX_ITEMS) return;
			const updateCart = [...cart];
			updateCart[itemExist].quantity++
			setCart(updateCart)
		} else {
			item.quantity = 1
			setCart([...cart, item])
		}
	}

	const removeFromCart = (id) => {
		setCart( prevCart => (prevCart.filter( item => item.id !== id )) )
	}


	const increseQuantity = (id) => {
		const updatedCart = cart.map( item => {
			if( item.id === id && item.quantity < MAX_ITEMS){
				return {
					...item,
					quantity: ++item.quantity
				}
			}
				return item;
		})
		setCart(updatedCart)
	}

	const decreseQuantity = (id) => {
		const updatedCart = cart.map( item => {
			if( item.id === id && item.quantity > MIN_ITEMS){
				return {
					...item,
					quantity: --item.quantity
				}
			}
				return item;
		})
		setCart(updatedCart)

	}


	const clearCart = () => {
		setCart([])
	}

	return (
		<>
			<Header cart={cart} clearCart={clearCart} removeFromCart={removeFromCart} increseQuantity={increseQuantity} decreseQuantity={decreseQuantity}/>

			<main className="container-xl mt-5">
				<h2 className="text-center">Nuestra Colección</h2>

				<div className="row mt-5">
					{
						data.map( (guitar) => {
							return <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart}/>
						})
					}
				</div>

			</main>

			<Footer/>
		
		</>
	)
}

export default App
