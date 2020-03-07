import React from 'react';

const Rank=({name, entries})=>{
    return(
        <div>
            <div className='white f5 center'>
                {`${name}, your number of entries:`}
            </div>
            <div className='white f3 center'>
                {entries}
            </div>
        
        </div>
    )
}
export default Rank;