import _ from 'lodash'
import qureystring from 'querystring'
import React, { Component } from 'react'
import { Platform, AppRegistry, StyleSheet, Text, View, Image, TextInput, TouchableHighlight, Modal } from 'react-native'
import { Container, Header, Footer, FooterTab, Title, Content, InputGroup, Input, Button, Icon, Spinner, Tabs, List, ListItem, Grid, Row } from 'native-base'
import { Match, Miss, Redirect, MemoryRouter as Router } from 'react-router'
import Accordion from 'react-native-accordion'
import Toast from 'react-native-root-toast'
import MD5 from 'blueimp-md5'

const GlobalConstant = {
	BaseUrl: 'http://www-alpha.qijigps.com/api/install',
	// BaseUrl: 'https://www.qijigps.com/api/install',
	ToastConfig: {
		duration: Toast.durations.LONG,
		position: Toast.positions.BOTTOM,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
	},
}
const GlobalMemory = {
	loggedIn: false,
	corpInfo: null,
	batchList: [],
}

class MyModal extends Component {
	render() {
		if (!this.props.visible) {
			return null
		}
		const ui = (
			<View style={{
				zIndex: 1000,
				position: 'absolute',
				top: 0, left:0, right:0, bottom: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				alignItems: 'center', justifyContent: 'center'
			}}>
				<View style={{alignItems: 'center', justifyContent: 'center'}}>
					<View style={{
						width: 200,
						height: 150,
						borderRadius: 10,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'white',
					}}>
						{this.props.children}
					</View>
				</View>
			</View>
		)
		if (Platform.OS === 'web') {
			return ui
		} else {
			return (
				<Modal
					animationType={"fade"}
					transparent={true}
					visible={true}
					onRequestClose={() => {}}
				>
					{ui}
				</Modal>
			)
		}
	}
}

function httpCommonRequestHandler(url, opt = {}) {
	let options = _.defaults(opt, { credentials: 'include' })
	if (typeof(options.body) === 'object') {
		options.body = JSON.stringify(options.body)
		_.defaults(options, { headers: { 'Content-Type': 'application/json; charset=UTF-8' } })
	}
	if (typeof(options.qs) === 'object') {
		options.qs = qureystring.stringify(options.qs)
		_.defaults(options, { method: 'GET' })
	}
	let uri = url
	if (options.qs) {
		uri = `${url}?${options.qs}`
	}

	return fetch(`${uri}`, options)
}

async function httpCommonResponseHandler(rs) {
	if (!rs.ok) {
		throw (await rs.text())
	}
	let json = await rs.json()
	if (json.message) {
		Toast.show(json.message, GlobalConstant.ToastConfig)
	}
	return json.status===0 ? json.data : null
}

class LoginComponent extends Component {
	state = {
		username: 'manjiao@测试*123',
		password: '111111',
		modalVisible: false,
		redirectTo: '',
	}
	async login() {
		let err
		if (!this.state.username) {
			err = '请输入账号'
		} else if (!this.state.password) {
			err = '请输入密码'
		}
		if (err) {
			Toast.show(err, GlobalConstant.ToastConfig)
			return
		}
		console.log('login')
		GlobalMemory.loggedIn = false
		try {
			this.setState({ modalVisible: true })
			let body = { mobile: this.state.username, password: MD5(this.state.password) }
			console.log(body)
			let rs = await httpCommonRequestHandler(`${GlobalConstant.BaseUrl}/login`, {
				method: 'POST',
				body
			})
			let json = await httpCommonResponseHandler(rs)
			if (json) {
				GlobalMemory.loggedIn = true
				GlobalMemory.corpInfo = json
			}
		} catch(err) {
			console.error(err)
		} finally {
			this.setState({ modalVisible: false })
			if (GlobalMemory.loggedIn) {
				this.setState({ redirectTo: '/' })
			}
		}
	}
	render() {
		if (this.state.redirectTo) {
			return (<Redirect to={this.state.redirectTo}/>)
		}
		return (
			<Container>
				<Content>
					<MyModal visible={this.state.modalVisible}>
						<Spinner style={{flex: 1}} color='#31bfb4' />
						<Text style={{flex: 1}}>正在加载，请稍后</Text>
					</MyModal>
					<View>
						<View style={{flex: 2, alignItems: 'center', justifyContent: 'flex-end'}}>
							<Image
								style={{width: 120, height: 120, marginTop: 50}}
								source={require('./img/logo.png')}
							/>
						</View>
						<View style={{flex: 2}}>
							<InputGroup
								style={{margin: 20}}
								borderType='underline'
								iconRight
							>
								<Icon
									style={{color:'gray'}}
									name='ios-backspace'
									onPress={() => this.setState({username: '', password: ''})}
								/>
								<Input
									maxLength={64}
									placeholder='账号'
									controlled={true}
									onChangeText={(username) => this.setState({username})}
									value={this.state.username}
								/>
							</InputGroup>
							<InputGroup
								style={{margin: 20}}
								borderType='underline'
								iconRight
							>
								<Icon
									style={{color:'gray'}}
									name={this.state.psdVisible ? 'ios-eye' : 'ios-eye-off'}
									onPress={() => this.setState({psdVisible: !this.state.psdVisible})}
								/>
								<Input
									maxLength={64}
									placeholder='密码'
									secureTextEntry={!this.state.psdVisible}
									onChangeText={(password) => this.setState({password})}
									value={this.state.password}
								/>
							</InputGroup>
							<Button
								style={{margin: 20, backgroundColor: '#31bfb4'}}
								block
								onPress={() => this.login().then()}>
								登录
							</Button>
						</View>
					</View>
				</Content>
			</Container>
		)
	}
}

class MainComponent extends Component {
	state = {
		batchList: []
	}
	constructor(props) {
		super(props)
		// if (GlobalMemory.batchList.length) {
		// 	this.state.batchList = GlobalMemory.batchList
		// } else {
		this.getBatchList().then(() => {}).catch((e) => console.error(e))
		// }
	}
	async getBatchList() {
		let rs = await httpCommonRequestHandler(`${GlobalConstant.BaseUrl}/batch/list`)
		if (!rs.ok) {
			throw (await rs.text())
		}
		let json = await httpCommonResponseHandler(rs)
		if (json) {
			GlobalMemory.batchList = json
			this.setState({batchList: json})
		}
	}
	async logout() {
		console.log('logout')
		GlobalMemory.loggedIn = false
		this.setState({ redirectTo: '/' })
	}
	render() {
		if (this.state.redirectTo) {
			return (<Redirect to={this.state.redirectTo}/>)
		}
		let items = []
		for (let i=0; i<this.state.batchList.length; i++) {
			let batch = this.state.batchList[i]
			items.push(
				<ListItem key={i} iconRight onPress={() => this.setState({redirectTo: `/batch/${batch.id}`})}>
					<Text>
						{batch.name}
					</Text>
					<Icon name='ios-arrow-forward'/>
				</ListItem>
			)
		}
		return (
			<Container>
				<Header style={{backgroundColor: '#31bfb4'}}>
					<Title style={{alignSelf: 'center'}}>
						{GlobalMemory.corpInfo.corp_name}
					</Title>
					<Button transparent onPress={() => this.logout().then()}>
						<Icon name='md-exit'/>
					</Button>
				</Header>
				<Content>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Button
							style={{flex: 1, justifyContent: 'center'}}
							transparent
							onPress={() => this.setState({ redirectTo: '/add-batch' })}
						>
							<Icon style={{color: '#31bfb4'}} name='md-add-circle'/>添加批次
						</Button>
						<Button
							style={{flex: 1, justifyContent: 'center'}}
							transparent
							onPress={() => this.setState({ redirectTo: '/account' })}
						>
							<Icon style={{color: '#31bfb4'}} name='md-contact'/>账号管理
						</Button>
					</View>
					<List style={{justifyContent: 'flex-start'}}>
						{items}
					</List>
				</Content>
			</Container>
		)
	}
}

class AddBatchComponent extends Component {
	state = {
		name: '',
		backup: GlobalMemory.corpInfo.name,
	}
	async addBatch() {
		let rs = await httpCommonRequestHandler(`${GlobalConstant.BaseUrl}/batch`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			body: _.pick(this.state, 'name', 'backup')
		})
		let json = await httpCommonResponseHandler(rs)
		if (json) {
			this.setState({redirectTo: '/'})
		}
	}
	render() {
		if (this.state.redirectTo) {
			return (<Redirect to={this.state.redirectTo}/>)
		}
		return (
			<Container>
				<Header style={{backgroundColor: '#31bfb4'}}>
					<Title style={{alignSelf: 'center'}}>
						添加批次
					</Title>
					<Button transparent onPress={() => this.setState({ redirectTo: '/' })}>
						<Icon name='ios-arrow-back'/>
					</Button>
				</Header>
				<Content>
					<List>
						<ListItem>
							<InputGroup borderType='underline' >
								<Input
									inlineLabel
									label='批次名'
									placeholder='示例：北京20161111'
									onChangeText={(name) => this.setState({name})}
									value={this.state.name}
								/>
							</InputGroup>
						</ListItem>
						<ListItem>
							<InputGroup borderType='underline' >
								<Input
									inlineLabel
									label='备注'
									onChangeText={(backup) => this.setState({backup})}
									value={this.state.backup}
								/>
							</InputGroup>
						</ListItem>
					</List>
					<Button
						style={{margin: 20, backgroundColor: '#31bfb4'}}
						block
						disabled={!this.state.name || !this.state.backup}
						onPress={() => this.addBatch().then()}>
						添加
					</Button>
				</Content>
			</Container>
		)
	}
}

class BatchComponent extends Component {
	state = {
		bid: null,
		batch: null,
		selectedCar: null,
		batchDetail: null,
		modalVisible: false,
	}
	constructor(props) {
		super(props)
		this.state.bid = this.props.params.bid
		this.state.batch = _.find(GlobalMemory.batchList, {id: this.state.bid})
		this.state.selectedCar = this.props.params.vin // todo open accordion by selectedCar
		this.getBatch().then(() => {}).catch((e) => console.error(e))
		console.log(this.state.batch)
	}
	async getBatch() {
		let rs = await httpCommonRequestHandler(`${GlobalConstant.BaseUrl}/batch`, {
			qs: {bid: this.state.bid}
		})
		let json = await httpCommonResponseHandler(rs)
		if (json) {
			GlobalMemory.batchDetail = json
			this.setState({batchDetail: json})
		}
	}
	async deleteBatch() {
		let rs = await httpCommonRequestHandler(`${GlobalConstant.BaseUrl}/batch`, {
			method: 'DELETE',
			qs: {bid: this.state.bid}
		})
		let json = await httpCommonResponseHandler(rs)
		if (json) {
			this.setState({redirectTo: '/'})
		}
	}
	render() {
		if (this.state.redirectTo) {
			return (<Redirect to={this.state.redirectTo}/>)
		}
		let items = []
		for (let i = 0; this.state.batchDetail && i < this.state.batchDetail.cars.length; i++) {
			let car = this.state.batchDetail.cars[i]
			let header = (
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Icon style={{flex:1, marginLeft: 10}} name='ios-arrow-forward'/>
					<Text style={{flex:10, marginLeft: 10}}>{car.vin}</Text>
					<Icon style={{flex:1, textAlign: 'right', marginRight: 10}} name='ios-add'/>
				</View>
			)
			let terminals = []
			for (let j = 0; j < car.terminals.length; j++) {
				let terminal = car.terminals[j]
				let color = 'green'
				if (!terminal.login) {
					color = 'gray'
				}
				terminals.push(
					<TouchableHighlight
						key={j}
						underlayColor='rgba(49,191,180,0.3)'
						style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}}
						onPress={() => this.setState({ redirectTo: `/batch/${this.state.batch.id}/${car.vin}/${terminal.tid}` })}
					>
						<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
							<Icon
								style={{flex:1, marginLeft: 10, color}}
								name='ios-radio-button-on'
							/>
							<Text style={{flex:10, marginLeft: 10}}>{terminal.sn}</Text>
							<Icon style={{flex:1, textAlign: 'right', marginRight: 10}} name='ios-arrow-forward'/>
						</View>
					</TouchableHighlight>
				)
			}
			let content = (
				<View>
					{terminals}
				</View>
			)
			items.push(
				<Accordion
				 	style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}}
					underlayColor='rgba(49,191,180,0.3)'
					key={i}
					header={header}
					content={content}
					easing="easeOutCubic"
					open={() => true}
				/>
			)
		}
		return (
			<Container>
				<Header style={{backgroundColor: '#31bfb4'}}>
					<Button transparent onPress={() => this.setState({ redirectTo: '/' })}>
						<Icon name='ios-arrow-back'/>
					</Button>
					<Title style={{alignSelf: 'center'}}>
						{this.state.batch.name}
					</Title>
					<Button transparent onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
						<Icon name='ios-menu'/>
					</Button>
				</Header>
				<Content>
					<MyModal visible={this.state.modalVisible}>
						<Grid>
							<Row>
								<TouchableHighlight
									style={{position: 'relative', top: 0, right: 0}}
									onPress={() => this.setState({ modalVisible: false })}
								>
									<Text><Icon name='ios-close'/></Text>
								</TouchableHighlight>
							</Row>
							<Row>
								<TouchableHighlight onPress={() => this.deleteBatch().then()}>
									<Text>删除</Text>
								</TouchableHighlight>
							</Row>
							<Row>
								<TouchableHighlight onPress={() => this.setState({ redirectTo: `/batch-detail` })}>
									<Text>批次详情</Text>
								</TouchableHighlight>
							</Row>
						</Grid>
					</MyModal>
					<View style={{justifyContent: 'flex-start'}}>
						{items}
					</View>
				</Content>
				<View style={{backgroundColor: '#EEE'}}>
					<View style={{flexDirection: 'row'}}>
						<Button
							color='black'
							style={{flex: 1, backgroundColor: '#EEE', justifyContent: 'center'}}
						>
							添加设备
							<Icon name='ios-add-circle-outline'/>
						</Button>
						<Button
							color='black'
							style={{flex: 1, backgroundColor: '#EEE', justifyContent: 'center'}}
						>
							导出
							<Icon name='ios-share-outline'/>
						</Button>
					</View>
				</View>
			</Container>
		)
	}
}

class BatchDetailComponent extends Component {
	state = {
		batchDetail: {},
	}
	constructor(props) {
		super(props)
		this.state.batchDetail = GlobalMemory.batchDetail
	}
	render() {
		if (this.state.redirectTo) {
			return (<Redirect to={this.state.redirectTo}/>)
		}
		let formItem = (text, field) => (
			<ListItem key={text}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
					<Text>{text}</Text>
					<Text>{this.state.batchDetail[field]}</Text>
				</View>
			</ListItem>
		)
		return (
			<Container>
				<Header style={{backgroundColor: '#31bfb4'}}>
					<Title style={{alignSelf: 'center'}}>
						批次详情
					</Title>
					<Button transparent onPress={() => this.setState({ redirectTo: `/batch/${this.state.batchDetail.bid}` })}>
						<Icon name='ios-arrow-back'/>
					</Button>
				</Header>
				<Content>
					<List>
						{[
							formItem('批次名', 'name'),
							formItem('创建时间', 'cratetime'),
							formItem('设备总数', 'cratetime'),
							formItem('安装正常总数', 'cratetime'),
							formItem('安装异常总数', 'cratetime'),
							formItem('备注', 'backup'),
						]}
					</List>
				</Content>
			</Container>
		)
	}
}

class TerminalComponent extends Component {
	state = {
		bid: null,
		vin: null,
		tid: null,
		terminalInfo: {},
	}
	constructor(props) {
		super(props)
		this.state.bid = this.props.params.bid
		this.state.vin = this.props.params.vin
		this.state.tid = this.props.params.tid
		this.getTerminal().then(() => {}).catch((e) => console.error(e))
	}
	async getTerminal() {
		let rs = await httpCommonRequestHandler(`${GlobalConstant.BaseUrl}/terminal`, {
			qs: {tid: this.state.tid}
		})
		let json = await httpCommonResponseHandler(rs)
		if (json) {
			this.setState({terminalInfo: json})
		}
	}
	render() {
		if (this.state.redirectTo) {
			return (<Redirect to={this.state.redirectTo}/>)
		}
		let formItem = (text, field) => (
			<ListItem key={text}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
					<Text>{text}</Text>
					<Text>{this.state.terminalInfo[field]}</Text>
				</View>
			</ListItem>
		)
		return (
			<Container>
				<Header style={{backgroundColor: '#31bfb4'}}>
					<Title style={{alignSelf: 'center'}}>
						设备详情
					</Title>
					<Button transparent onPress={() => this.setState({ redirectTo: `/batch/${this.state.bid}` })}>
						<Icon name='ios-arrow-back'/>
					</Button>
				</Header>
				<Content>
					<List>
						{[
							formItem('设备SN', 'sn'),
							formItem('激活码', 'activation_code'),
							formItem('车辆标识', 'vin'),
							formItem('设备类型', 'type'),
							formItem('激活时间', 'activation_timestamp'),
							formItem('配对状态', 'exstatus'),
							formItem('工作状态', 'exstatus'),
							formItem('位置信息', 'position'),
							formItem('定位时间', 'poi_timestamp'),
							formItem('安装人员', 'installers'),
						]}
					</List>
				</Content>
			</Container>
		)
	}
}

class AccountComponent extends Component {
	state = {
		accountInfo: {},
	}
	constructor(props) {
		super(props)
		this.getAccount().then(() => {}).catch((e) => console.error(e))
	}
	async getAccount() {
		let rs = await httpCommonRequestHandler(`${GlobalConstant.BaseUrl}/account`)
		let json = await httpCommonResponseHandler(rs)
		if (json) {
			this.setState({accountInfo: json})
		}
	}
	async logout() {
		GlobalMemory.loggedIn = false
		this.setState({ redirectTo: '/' })
	}
	render() {
		if (this.state.redirectTo) {
			return (<Redirect to={this.state.redirectTo}/>)
		}
		let formItem = (text, field) => (
			<ListItem key={text}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
					<Text>{text}</Text>
					<Text>{field}</Text>
				</View>
			</ListItem>
		)
		return (
			<Container>
				<Header style={{backgroundColor: '#31bfb4'}}>
					<Title style={{alignSelf: 'center'}}>
						账号管理
					</Title>
					<Button transparent onPress={() => this.setState({ redirectTo: `/` })}>
						<Icon name='ios-arrow-back'/>
					</Button>
				</Header>
				<Content>
					<List>
						{[
							formItem('账号名称', this.state.accountInfo['mobile']),
							formItem('账号负责人', this.state.accountInfo['responsible']),
							formItem('数据下载', <Icon name='ios-arrow-forward'/>),
							formItem('操作帮助', <Icon name='ios-arrow-forward'/>),
							formItem('联系我们', '400-902-4650'),
						]}
					</List>
					<Button
						block
						style={{backgroundColor: '#31bfb4', marginTop: 20}}
						onPress={() => this.logout().then()}
					>
						退出账号
					</Button>
				</Content>
			</Container>
		)
	}
}

class MyRouter extends Component {
	render() {
		return (
			<Router>
				<View style={{flex: 1}}>
					<Match exactly pattern='/' render={() => (
						GlobalMemory.loggedIn ? (
							<Redirect to='/main'/>
						) : (
							<Redirect to='/login'/>
						)
					)}/>
					<Match exactly pattern='/login' component={LoginComponent}/>
					<Match exactly pattern='/main' component={MainComponent}/>
					<Match exactly pattern='/add-batch' component={AddBatchComponent}/>
					<Match exactly pattern='/batch/:bid' component={BatchComponent}/>
					<Match exactly pattern='/batch-detail' component={BatchDetailComponent}/>
					<Match exactly pattern='/batch/:bid/:vin' component={BatchComponent}/>
					<Match exactly pattern='/batch/:bid/:vin/:tid' component={TerminalComponent}/>
					<Match exactly pattern='/account' component={AccountComponent}/>
					<Miss render={() => <View>not found</View>}/>
				</View>
			</Router>
		)
	}
}

AppRegistry.registerComponent('myReact', () => MyRouter)
if (Platform.OS === 'web') {
	AppRegistry.runApplication('myReact', { rootTag: document.getElementById('brickyard-app') })
}
