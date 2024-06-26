import React from 'react';
import { useCartContext } from './context/CartContext';
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CartItem from './components/CartItem';
import { useAuth } from './context/AuthContext';
import { Button } from './styles/Button';
import { NavLink } from 'react-router-dom';
import FormatPrice from './helpers/FormatPrice';
import { toast, Toaster } from 'react-hot-toast';

const Cart = () => {
  const { cart, clearCart, total_amount } = useCartContext();  
  const { authUser,isLoggedIn} = useAuth();

  const navigate = useNavigate();  
  
  const Msg = ({closeToast}) => (
    <ToastWrapper>
      Please log in before checking out!
      <br />
      <br />
      <div className='toast-btn-container'> 
       <button onClick={()=> {toast.dismiss();navigate('/login')}}> Login</button>
        <button onClick={()=>{toast.dismiss()}}> Close</button>
      </div>      
      
    </ToastWrapper>
  )

  const handleCheckoutRedirect= (e) => {
    console.log(authUser);
    console.log(isLoggedIn)
    if(!authUser || !isLoggedIn){
      toast (<Msg />, {duration: 10000});            
    }else{
      alert("Logged In");
      navigate('/checkout')
    }
}

  if (cart.length === 0) {
    return (
      <EmptyDiv>
        <h3>Your Cart Is Empty!</h3>
      </EmptyDiv>
    )
  }
  return (
    <Wrapper>
      <div className='container'>
        <div className='cart-heading grid grid-five-column'>
          <p>Item</p>
          <p className='cart-hide'>Price</p>
          <p>Quantity</p>
          <p className='cart-hide'> Total Price</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className='cart-item'>
          {
            cart.map((currentItem) => {
              debugger;
              return <CartItem key={currentItem.id} {...currentItem} />
            })
          }
        </div>
        <hr />
        <div className='cart-actions-total'>
          <div className='actions-link'>
            <div className='clear-or-continue'>
            <NavLink to='/Products'>
              <p>Continue Shopping</p>
            </NavLink>
            <p> | </p>
            <p onClick={clearCart}>Clear Cart</p>
            </div>     
                      
                     
          </div>
          

          <div className='order-total--amount'>
            <div className='order-total--subdata'>
              <div>
                <p>Order Total: </p>
                <p> <FormatPrice price={total_amount} /> </p>
              </div>

            </div>

          </div>


        </div>
        <hr />

        {/* order total_amount */}
        {/* <div className='order-total--amount'>
          <div className='order-total--subdata'>
            <div>
              <p>Order Total: </p>
              <p> <FormatPrice price={total_amount}/> </p>
            </div>
            
          </div>

        </div> */}
        <div className='cart-buttons'>
        <Button onClick={handleCheckoutRedirect}>Check Out</Button>
        
        </div>
        <Toaster 
          containerStyle={{
            top: 100,
            left: 50
          }}
         toastOptions={{
                        style: {
                          
                            border: '1px solid black',
                            fontSize: '20px',
                            padding: '10px',                            
                            color: '#C43823'
                        }
                    }} />

      </div>
    </Wrapper>
  )
}

const ToastWrapper = styled.div`


  .toast-btn-container{
    display:flex;
    justify-content:center;

    button{
      margin:8px;
      padding:5px;
      background: ${({ theme }) => theme.colors.subtle};
      color: ${({ theme }) => theme.colors.highlighter};
      border:none;
      border-radius:5px;
    }
  }
`;


const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-actions-total{
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }
  .cart-buttons {
    margin-top: 2rem;    
    display: flex;
    justify-content : flex-end;
    

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .actions-link{
    
    text-transform: capitalize;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .clear-or-continue{  
     
      display: flex;
      flex-direction: row;
      gap: 1.8rem;

     p{      
      cursor:pointer;
      font-size: 1.8rem;
     color: ${({ theme }) => theme.colors.secondary};
     }
    
  }
  .order-total--amount {
    
    margin-left : 25rem;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .order-total--subdata {
      margin-top : 0;
      
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
     
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;
export default Cart;
