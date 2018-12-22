import React, {Component} from 'react';


interface IProps {
    show?:'none'
}

export default class Circle extends Component<IProps> {

     constructor(props: IProps) {
         super(props)
         this.state = {}
     }

    render() {
        return (
            <div style={{
                position: 'absolute',
                width: r1,
                height: r1,
                backgroundColor: '#aaa',
                borderColor: 'red',
                borderRadius: r1,
                marginTop: 80,
                marginLeft: 140,
                display:this.props.show,
            }}>

            </div>
            // <div style={style.dot}>
            //     {/*<div style={style.dot2}></div>*/}
            // </div>
        )
    }
}

const r1 = 40
const r2 = 30
const style = {
    dot: {
        position: 'absolute',
        width: r1,
        height: r1,
        backgroundColor: '#aaa',
        borderColor: 'red',

        borderRadius: r1,
        marginTop: 80,
        marginLeft: 140,
    },
    // dot2: {
    //     position: 'absolute',
    //     width: r2,
    //     height: r2,
    //     // backgroundColor: '#fff',
    //     backgroundColor: '#fff',
    //     borderRadius: r2,
    //     // zIndex: 1,
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     bottom: 0,
    //     margin: 'auto',
    // }
}

