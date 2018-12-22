/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react';
import './App.css';
import Circle from "./circle";

const urlPath = {
    url0: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3681163961,2496921165&fm=200&gp=0.jpg",
    url14: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=588324612,2278254152&fm=200&gp=0.jpg",
    url02: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2363290332,3661093549&fm=200&gp=0.jpg",
    url03: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2161733480,1745955910&fm=200&gp=0.jpg",
    url04: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=245305542,4249539839&fm=200&gp=0.jpg",
    url05: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=261165340,2480800952&fm=200&gp=0.jpg",
    url06: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1182496696,1052876580&fm=200&gp=0.jpg",
    url07: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1799102518,2949681226&fm=200&gp=0.jpg",
    url08: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1471829699,1521574569&fm=200&gp=0.jpg",
    url09: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3982733525,501317770&fm=200&gp=0.jpg",
    url10: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1405262283,1360856183&fm=200&gp=0.jpg",
    url11: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2081315839,3481636148&fm=200&gp=0.jpg",
    url12: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1454461138,1860713333&fm=200&gp=0.jpg",
    url13: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3583787492,1408733553&fm=200&gp=0.jpg",
}

let account_name = 'ccc'
let contract_name = 'ccc'
let table_name = 'account'

let table_account = 'account'
let table_bet = 'bet'
let table_gbet = 'gbet'

// let table_name = 'game'
let Eos = require('eosjs')
let options = {
    httpEndpoint: 'http://127.0.0.1:8888',
    verbose: false,
    fetchConfiguration: {},
    keyProvider: ["5JYirJVSH3hkoXJAVqpcuTQvzxTYYBpe4PEFDAuK8Xu1mVg1zFC", "5JC2Tdc5DVJHN7qacBLuUMcTcYKqqW6LpqfVeszdTzZgcDJV9ZA"],
}
let eos = Eos(options)

class App extends Component {
    constructor(props) {
        super(props)
        this._initGameData = this._initGameData.bind(this)
        this._onClickBoxout1 = this._onClickBoxout1.bind(this)
        this._onClickBoxout2 = this._onClickBoxout2.bind(this)

        this.gameprops = {
            gameIndex: -1,
            gameDataList: [],
            loading_text: '正在读取数据...',
        }

        this.state = {
            dotShow1: 'none',
            dotShow2: 'none',
            gameStatus: false,

            play_owner: "",
            offer_bet: "",
            betOn: 0,
            balance: "",
            winner: 0,
            txtWin: "",
            poke1URL: urlPath.url0,
            poke2URL: urlPath.url0,
            poke3URL: urlPath.url0,

            poke4URL: urlPath.url0,
            poke5URL: urlPath.url0,
            poke6URL: urlPath.url0,

            circleShow: false,
        }
    }

    componentDidMount() {
        this._initGameData()
    }

    render() {
        return (this._renderMain())
    }

    _renderMain() {
        return (
            <div style={style.container}>
                {this._renderHeader()}
                {this._renderBody()}
            </div>
        )
    }

    _renderHeader() {
        return (
            <div style={style.headerBox}>
                <div style={style.headerRightBox}>
                    <button style={style.headerRightBtn} onClick={this._clickBtnReveal.bind(this)}>开奖</button>
                    <text style={style.total_num}>{this.state.balance}</text>
                    <text style={style.total_num}>{this.state.play_owner}</text>
                    <text style={style.total_num}>{this.state.betOn}</text>
                    <text style={style.total_num}>下注</text>
                </div>
            </div>

        )
    }

    _renderBody() {
        return (
            <div style={style.bodyBox}>
                <div style={{height: 40, width: '100%'}}>
                </div>
                {this._renderGameBox()}
            </div>
        )
    }

    _onClickBoxout1() {
        this.setState({
            dotShow1: 'block',
            dotShow2: 'none',
        })
        //记录下注
        this.setState({
            betOn: 1,
        })
        console.log("下注1");
    }

    _onClickBoxout2() {
        this.setState({
            dotShow1: 'none',
            dotShow2: 'block',
        })
        this.setState({
            betOn: 2,
        })
        console.log("下注2");
    }


    _renderGameBox() {
        let game = this.gameprops.gameDataList[this.gameprops.gameIndex]

        return (
            <div style={style.mgameBox}>
                <div style={style.box} onClick={this._onClickBoxout1}>
                    <img style={style.pokeImg} src={this.state.poke1URL}/>
                    <img style={style.pokeImg} src={this.state.poke3URL}/>
                    <img style={style.pokeImg} src={this.state.poke5URL}/>
                    <Circle show={this.state.dotShow1}></Circle>
                </div>
                <div style={style.result}>
                    <text>{this.state.txtWin}</text>
                </div>
                <div style={style.box} onClick={this._onClickBoxout2}>
                    <img style={style.pokeImg} src={this.state.poke2URL}/>
                    <img style={style.pokeImg} src={this.state.poke4URL}/>
                    <img style={style.pokeImg} src={this.state.poke6URL}/>
                    <Circle show={this.state.dotShow2}></Circle>
                </div>
            </div>

        )
    }

    _initGameData() {
        console.log('_initGameData::......')

        this._updateGameData()
        eos.contract(contract_name).then(co => co.creategame({authorization: account_name}).then(() => {
                console.log("开盘成功!")

                eos.getTableRows({
                    "json": true,
                    "code": contract_name,
                    "scope": contract_name,
                    "table": table_bet,
                    "limit": 100000000,
                }).then(res => {
                    let bet = res.rows[res.rows.length - 1]
                    let s1 = String(bet.p1).substr(1,2);
                    let s2 = String(bet.p2).substr(1,2);
                    let urlName1 = "url" + s1
                    let urlName2 = "url" + s2

                    console.log(urlName1)
                    console.log(urlName2)
                    console.log("openbet url1:" + urlName1)
                    console.log("openbet url2:" + urlName2)
                    this.setState({
                        // p1: .balance,
                        poke1URL: urlPath[urlName1],
                        poke2URL: urlPath[urlName2],
                        txtWin: '',
                    })
                })
            }
        ))
    }


    // cleos get table luckpoint.co luckpoint.co game
    _updateGameData() {
        // console.log('_updateGameData::......')
        console.log('creategame::......')

        // this._showLoading(true, '正在读取游戏数据... ...')

        this.gameprops.gameIndex = -1
        this.gameprops.gameDataList = []
        // // 读取游戏数据
        eos.contract(contract_name).then(() => {
            eos.getTableRows({
                "json": true,
                "code": contract_name,
                "scope": contract_name,
                "table": table_account,
                "limit": 100000000,
            }).then(res => {
                console.log("read table...")
                let rows = res.rows
                let len = rows.length
                if (len > 0) {
                    // this.gameprops.gameIndex = len - 1
                    //设置初始化state
                    let owner = res.rows[res.rows.length - 1].owner
                    let balance = res.rows[res.rows.length - 1].balance
                    console.log("用户:" + owner)
                    console.log("数量:" + balance)
                    this.setState({
                        play_owner: owner,
                        balance: balance,
                    })
                }
                this._refreshUIView()
                console.log("读取游戏列表成功:共" + len + "条数据")
            }).catch((err) => {
                this.gameprops.gameIndex = -1
                this._refreshUIView()
                console.log("读取游戏列表失败")
            })
        })
    }

    _createGame() {
        this._showLoading(true, '正在创建游戏... ...')
        console.log("_createGame->创建游戏 ...")
        eos.contract(contract_name).then(co => {
            co.creategame(account_name, {
                authorization: account_name
            }).then((res) => {
                console.log("get contract success")
                // setTimeout(() => this._showLoading(false, ''), 2000)
                // setTimeout(() => alert('游戏创建成功'), 3000)
                //创建成功后，做一次数据查询，庄家先亮牌
                eos.getTableRows({
                    "json": true,
                    "code": contract_name,
                    "scope": contract_name,
                    "table": table_name,
                    "limit": 100000000,
                }).then(res => {
                    let rows = res.rows
                    let len = res.rows.length
                    let player1Value = res.rows[res.rows.length - 1].player1
                    let urlName = "url" + player1Value
                    this.setState({
                        player1URL: urlPath[urlName],
                        player2URL: urlPath.url0
                    })
                    console.log("庄家随机产生牌点数:" + player1Value)
                }).catch(
                    err => console.log(err)
                )

                this._showLoading(false, '')
                this._updateGameData()
                console.log(res)
            }).catch((err) => {
                console.error("contract err:" + err)
                this._updateGameData()
            })
        })
    }

    _playerOpenCard(game_id, play_id) {
        console.log('_playerOpenCard::游戏ID:' + game_id + '，玩家' + play_id + '开牌 ...')
        this._showLoading(true, '玩家' + play_id + '正在开牌 ...')

        eos.contract(contract_name).then(co => {
            co.opencard(game_id, play_id, {authorization: account_name}).then(res => {
                console.log('玩家' + play_id + '开牌成功')
                setTimeout(() => this._showLoading(false, ''), 3000)

                eos.getTableRows({
                    "json": true,
                    "code": contract_name,
                    "scope": contract_name,
                    "table": table_name,
                    "limit": 100000000,
                }).then(res => {
                    let rows = res.rows
                    let len = res.rows.length
                    let player2Value = res.rows[res.rows.length - 1].player2
                    let urlName = "url" + player2Value
                    this.setState({
                        player2URL: urlPath[urlName]
                    })
                    console.log("玩家随机产生牌点数:" + player2Value)
                }).catch(
                    err => console.log(err)
                )


                this._updateGameData()
            }).catch((err) => {
                console.log('开牌失败')
                setTimeout(() => this._showLoading(false, ''), 3000)
            })
        })
    }

    _renderLoading() {

        if (this.state.loading) {
            return (
                <div style={style.loadingBox}>
                    <div style={style.loadingImage}>
                        <img style={style.loadingImageImg} src="images/prompticon.png" width='100'
                             height='100'></img>
                    </div>
                    <div style={style.loadingText}>
                        <span style={style.loadingTextValue}>{this.gameprops.loading_text}</span>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }

    _refreshUIView() {
        console.log('_refreshUIView::gameStatus=' + this.state.gameStatus)

        this._showLoading(false, '')
    }

    _showLoading(show, text) {
        this.gameprops.loading_text = text
        this.setState({
            loading: show,
        })
    }

    _clickBtnCreateGame() {
        console.log('_clickBtnCreateGame::创建新游戏...')
        this._createGame()
    }

    _clickBtnReveal() {

        console.log("reveal");
        console.log(this.state.play_owner);
        console.log("下注:" + this.state.betOn);
        if (this.state.betOn == 0) {
            alert("请选择下注")
            return;
        }

        eos.getTableRows({
            "json": true,
            "code": contract_name,
            "scope": contract_name,

            "table": table_gbet,
            "limit": 100000000,
        }).then(res => {
            if (res.rows.length == 0) {
                alert("请创建游戏");
                return;
            }
            let gbet = res.rows[res.rows.length - 1]
            let rev = gbet.reveal
            let open = gbet.open
            if (rev == 1 || open == 0) {
                alert("游戏结束，请重开一局")
            }


            eos.contract(contract_name).then(co => {
                co.reveal("3.0000 SYS", this.state.play_owner, this.state.betOn, {authorization: account_name}).then(() => {
                        console.log("reveal scueess")

                        eos.getTableRows({
                            "json": true,
                            "code": contract_name,
                            "scope": contract_name,

                            "table": table_bet,
                            "limit": 100000000,
                        }).then(res => {
                            let bet = res.rows[res.rows.length - 1]
                            if (bet.winner == 2) {
                                this.setState({
                                    txtWin: "赢了"
                                })
                            } else {
                                this.setState({
                                    txtWin: "输了"
                                })
                            }
                            this.setState({
                                balance: bet.balance,
                            })

                            let urlName3 = "url" + String(bet.p3).substr(1,2)
                            let urlName4 = "url" + String(bet.p4).substr(1,2)
                            let urlName5 = "url" + String(bet.p5).substr(1,2)
                            let urlName6 = "url" + String(bet.p6).substr(1,2)
                            console.log("openbet url3:" + urlName3)
                            console.log("openbet url4:" + urlName4)
                            console.log("openbet url5:" + urlName5)
                            console.log("openbet url6:" + urlName6)
                            this.setState({
                                // p1: .balance,
                                poke3URL: urlPath[urlName3],
                                poke4URL: urlPath[urlName4],
                                poke5URL: urlPath[urlName5],
                                poke6URL: urlPath[urlName6],
                            })

                        })

                        eos.getTableRows({
                            "json": true,
                            "code": contract_name,
                            "scope": contract_name,
                            "table": table_account,
                            "limit": 100000000,
                        }).then(res => {
                            let account = res.rows[res.rows.length - 1]
                            this.setState({
                                balance: account.balance,
                            })
                        })
                    }
                )
            })

        })


    }

    _clickPlayerBtn(play_id) {

        console.log('_clickPlayerBtn::play_id=' + play_id)
        if (this.gameprops.gameIndex < 0) {
            alert('没找到当前游戏！')
            return
        }

        let game = this.gameprops.gameDataList[this.gameprops.gameIndex]
        // if (play_id == 1 && game.player1 == 1 || play_id == 2 && game.player2 == 1) {
        //     alert('玩家已经开牌了！')
        //     return
        // }
        if (play_id == 2 && game.player2 != 0) {
            alert('玩家已经开牌了，请创建游戏！')
            return
        }

        this._playerOpenCard(game.id, play_id)
    }

    _clickRefreshBtn() {
        console.log('_clickRefreshBtn::... ...')
        this._updateGameData()
    }
}

const
    style = {
        container: {
            width: '100%',
            height: 1000,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: '#181a33',
            margin: 0,
            padding: 0,
        },
        loadingBox: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.85,
            backgroundColor: '#000000',
        },
        loadingImage: {
            position: 'relative',
            width: '100%',
            height: 120,
            lineHeight: 120,
            alignItems: 'center',
            marginTop: 220,
            marginBottom: 30,
        },
        loadingImageImg: {
            position: 'absolute',
            left: '45%',
            width: 100,
            height: 100,
        },
        loadingText: {
            position: 'relative',
            width: '100%',
            height: 120,
            lineHeight: 120,
        },
        loadingTextValue: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '99%',
            height: 100,
            lineHeight: 2,
            color: '#ffffff',
            fontSize: 28,
            paddingTop: '-50',
            textAlign: 'center',
        },
        headerLogoBox: {
            float: 'left',
            width: 790,
            height: 180,
        },
        headerLogo: {
            // width: 780,
            // height: 160,
            // marginTop: 10,
            // marginLeft: 10,
        },
        headerBox: {
            width: '100%',
            height: 60,
            backgroundColor: '#1c233d',
            // backgroundColor: '#13151c'
        },
        headerRightBox: {
            width: '70%',
            height: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        total_num: {
            float: 'right',
            color: '#ffffff',
            fontSize: 18,
            height: 60,
            marginTop: 23,
            marginRight: 10,
        },
        headerRightBtn: {
            float: 'right',
            color: '#ffffff',
            fontSize: 20,
            height: 35,
            width: 110,

            border: 'none',
            fontWeight: 'bold',
            borderRadius: 20,
            marginTop: 14,
            // marginLeft: 15,
            backgroundColor: '#3a91e7',
        },

        headerLeftBtn: {
            float: 'left',
            color: '#ffffff',
            fontSize: 20,
            height: 35,
            width: 110,
            // border: 'none',
            fontWeight: 'bold',
            borderRadius: 20,
            marginTop: 14,
            // marginLeft: 15,
            backgroundColor: 'transparent',
        },


        bodyBox: {
            width: '70%',
            height: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#384868',
            borderRadius: 10,

        },
        bodyTitle: {
            // display: 'block',
            height: 50,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: 'orange',
        },
        titleBtn: {
            float: 'right',
            width: 100,
            height: 40,
            display: 'block',
        },
        gameBox: {
            width: '100%',
            // height: 400,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1.0,
        },
        emptyGamePrompt: {
            fontSize: 22,
            marginTop: 10,
            marginLeft: 50,
            color: '#fff'
        },
        gameBoxPlayer: {
            display: 'inline-block',
            width: '100%',
            height: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3,
        },
        gamePlayerName: {
            width: '100%',
            height: 50,
            marginBottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        gamePlayerNameValue: {
            display: 'block',
            width: '100%',
            height: 36,
            paddingTop: 5,
            textAlign: 'center',
            fontSize: 25,
            color: '#fff',
        },
        gamePlayerImage: {
            width: '100%',
            height: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 0,
        },
        gamePlayerImageValue: {
            width: '100%',
            height: '100%',
            // borderColor: '#cdc9c9',
            // borderStyle: 'solid',
            // borderRadius: 3,
        },
        gamePlayerButton: {
            width: 160,
            height: 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
        },
        playButton: {
            width: '100%',
            height: 40,
            border: 'none',
            borderWidth: 1,
            borderRadius: 20,
            marginTop: 20,
            color: '#ffffff',
            fontSize: 20,
            outline: 'none',
            backgroundColor: '#56b4df',
        },
        gameBoxScreen: {
            display: 'inline-block',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        gameScreenStatus: {},
        gameScreenStatusValue: {
            display: 'block',
            textAlign: 'center',
            color: '#74ed9c',
            fontSize: 28,
        },
        gameScreenFrames: {
            width: 180,
            height: 200,
            borderRadius: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: "gray",
        },
        gameScreenFramesValue: {
            width: 120,
            height: 180,
            marginTop: 10,
            marginLeft: 40,
        },
        gameScreenRefresh: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        mgameBox: {
            width: 500,
            display: 'block',
            margin: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        divInline1: {
            width: 230,
            height: '90%',
            float: 'left',
            display: 'block',
            marginTop: 50,
        },
        divInline2: {
            // width: 200,
            // height: 300,
            float: 'left',
            display: 'block',
        },
        box: {
            height: '100%',
            width: 500,
            margin: 'auto',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'green',
        },
        pokeImg: {
            height: 210,
            width: 150
        },
        result: {
            height: 60,
            width: 60,
            margin: 'auto',
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 25,
        }
    }
export default App;
