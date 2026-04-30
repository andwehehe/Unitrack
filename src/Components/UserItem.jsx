import SubmitBTN from './SubmitBTN';
import OrderPanel from './OrderPanel';
import { useState } from 'react';

function UserItem({ uniform, imageMap }) {

    const { name, course, sizes } = uniform;
    const { s, m, l, xl } = sizes;
    const [ openOrder, setOpenOrder ] = useState(false);

    return(

        <>
            <article 
                key={name}
                className='w-full border-2 rounded-lg p-2 flex flex-col gap-2 max-w-[343px]'
            >
                <div className='
                    flex items-center justify-between
                    [@media(max-width:360px)]:flex [@media(max-width:360px)]:flex-col
                    [@media(max-width:360px)]:items-start
                    lg:flex lg:flex-col lg:items-start
                '>
                    <img 
                        src={imageMap} 
                        alt="uniform image" 
                        className='
                            w-[7.7rem] h-[6rem] rounded-lg
                            [@media(max-width:360px)]:w-full
                            [@media(max-width:360px)]:h-[10rem]
                            lg:w-full lg:h-[14rem]
                        ' 
                    />

                    <div>
                        <div className='leading-none mb-2'>
                            <h3 className='text-lg font-semibold lg:text-xl lg:text-bold lg:mt-2'>
                                {name}
                            </h3>
                            <p className='text-xs text-clr_description lg:text-sm'>
                                Department: {course}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs lg:text-sm">
                            <p>S: ₱{s.price} · {s.stock} Left</p>
                            <p>M: ₱{m.price} · {m.stock} Left</p>
                            <p>L: ₱{l.price} · {l.stock} Left</p>
                            <p>XL: ₱{xl.price} · {xl.stock} Left</p>
                        </div>
                    </div>
                </div>

                <SubmitBTN prompt="Order" setOpenOrder={setOpenOrder}  />
            </article>
            
            <OrderPanel 
                openOrder={openOrder} 
                setOpenOrder={setOpenOrder} 
                uniform={uniform} 
            />
        </>
    );
}

export default UserItem