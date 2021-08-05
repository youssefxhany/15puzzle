import { Component } from "react";

const Tile = ({index, pos, onClick}) => {
    const top = pos[0]*100 + 5;
    const left = pos[1]*100 + 5;
    const bgLeft = (index%4)*100 + 5;
    const bgTop = Math.floor(index/4)*100 + 5;
    return <button className='tile' style={{top, left, backgroundPosition: `-${bgLeft}px -${bgTop}px`}} onClick={()=>onClick(index)}>{index} </button>
}
// class Tile extends Component{

// constructor({index, elem, onClick}){
//     //console.log(pos);
//     //function Tile ({index, pos, onClick}) 
//     let pos = elem
//     const top = pos[0]*100 + 5;
//     const left = pos[1]*100 + 5;
//     const bgLeft = (index%4)*100 + 5;
//     const bgTop = Math.floor(index/4)*100 + 5;
//     return (<div>
//         {pos[0]}, {pos[1]}
//     </div>)
//     return <button       className='tile'
//       onClick={onClick}
//       style={{top, left, backgroundPosition: `-${bgLeft}px -${bgTop}px`}} >{elem[0]}</button>
//     //  <div 
//     //   className='tile'
//     //   onClick={onClick}
//     //   style={{top, left, backgroundPosition: `-${bgLeft}px -${bgTop}px`}} 
      
//     // />;
  
// }
// }
export default Tile;