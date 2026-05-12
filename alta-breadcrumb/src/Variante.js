import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Component } from "react"
import {
	Breadcrumb,
	BreadcrumbItem,
	Button,
	ButtonGroup,
	Card,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Offcanvas,
	OffcanvasBody,
	OffcanvasHeader,
} from "reactstrap"
import "./App.css"

const BASE_URL = "http://localhost:4000"

const INITIAL_LOGIN = {
	usuario: "",
	password: "",
}

const INITIAL_ENLACE = {
	nombre: "",
	url: "",
}

// COMPONENTES
class FormField extends Component {
	render() {
		const { id, label, ...props } = this.props

		return (
			<FormGroup>
				<Label for={id}>{label}</Label>

				<Input id={id} {...props} />
			</FormGroup>
		)
	}
}

class BreadcrumbList extends Component {
	render() {
		const { enlaces } = this.props

		return (
			<Breadcrumb>
				{enlaces.map(({ id, nombre, url }) => (
					<BreadcrumbItem key={id}>
						<a href={url}>{nombre}</a>
					</BreadcrumbItem>
				))}
			</Breadcrumb>
		)
	}
}

class LoginCanvas extends Component {
	render() {
		const {
			isOpen,
			toggle,
			isLogged,
			login,
			error,
			title,
			onChange,
			onLogin,
			onLogout,
		} = this.props

		return (
			<Offcanvas isOpen={isOpen} toggle={toggle}>
				<OffcanvasHeader toggle={toggle}>
					{isLogged ? title : "Login"}
				</OffcanvasHeader>

				<OffcanvasBody>
					{isLogged ? (
						<Button color='danger' className='rounded w-100' onClick={onLogout}>
							Log Out
						</Button>
					) : (
						<Card className='p-4 d-flex flex-column gap-3'>
							<FormField
								id='usuario'
								name='usuario'
								label='Usuario'
								type='text'
								placeholder='Ej: pepe12'
								value={login.usuario}
								onChange={onChange}
							/>

							<FormField
								id='password'
								name='password'
								label='Contraseña'
								type='password'
								placeholder='****'
								value={login.password}
								onChange={onChange}
							/>

							{error && <span className='text-danger'>{error}</span>}

							<Button color='primary' className='rounded' onClick={onLogin}>
								Login
							</Button>
						</Card>
					)}
				</OffcanvasBody>
			</Offcanvas>
		)
	}
}

class App extends Component {
	state = {
		enlaces: [],

		modals: {
			alta: false,
			desactivar: false,
			canvas: false,
		},

		nuevoEnlace: INITIAL_ENLACE,

		idDesactivar: "",

		login: INITIAL_LOGIN,

		title: null,

		error: null,
	}

	// CICLO DE VIDA
	componentDidMount() {
		this.fetchEnlaces()
	}

	// HELPERS
	toggleModal = (modal) => {
		this.setState((prev) => ({
			modals: {
				...prev.modals,
				[modal]: !prev.modals[modal],
			},
		}))
	}

	handleChange = (key) => (event) => {
		const { name, value } = event.target

		this.setState((prev) => ({
			[key]: {
				...prev[key],
				[name]: value,
			},
		}))
	}

	getNextId = () => {
		const { enlaces } = this.state

		if (enlaces.length === 0) {
			return 1
		}

		return enlaces[enlaces.length - 1].id + 1
	}

	// API
	fetchEnlaces = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/enlaces.php`)

			this.setState({
				enlaces: res.data,
				idDesactivar: res.data[0]?.id || "",
			})
		} catch (error) {
			console.error("Error cargando enlaces:", error)
		}
	}

	// ACTIONS
	handleStoreSubmit = () => {
		const { nuevoEnlace } = this.state

		const enlace = {
			id: this.getNextId(),
			...nuevoEnlace,
		}

		this.setState((prev) => ({
			enlaces: [...prev.enlaces, enlace],

			nuevoEnlace: INITIAL_ENLACE,

			idDesactivar: enlace.id,

			modals: {
				...prev.modals,
				alta: false,
			},
		}))
	}

	handleDesactivarSubmit = () => {
		const { enlaces, idDesactivar } = this.state

		const nuevosEnlaces = enlaces.filter(
			(enlace) => enlace.id !== Number(idDesactivar),
		)

		this.setState((prev) => ({
			enlaces: nuevosEnlaces,

			idDesactivar: nuevosEnlaces[0]?.id || "",

			modals: {
				...prev.modals,
				desactivar: false,
			},
		}))
	}

	handleLoginSubmit = async () => {
		const { login } = this.state

		try {
			const res = await axios.post(`${BASE_URL}/nuevos-usuarios.php`, login)

			this.setState({
				title: res.data.offcavas,

				enlaces: res.data.enlaces,

				error: null,
			})
		} catch (error) {
			this.setState({
				error: error.response.data.error,
			})
		}
	}

	handleLogOut = () => {
		this.fetchEnlaces()

		this.setState({
			login: INITIAL_LOGIN,

			title: null,

			error: null,
		})
	}

	// RENDER

	render() {
		const { enlaces, modals, nuevoEnlace, idDesactivar, login, title, error } =
			this.state

		const isLogged = Boolean(title)

		const hasEnlaces = enlaces.length > 0

		return (
			<div className='App p-5'>
				<Card className='p-4 d-flex gap-3'>
					<h1>Menú con Reactstrap Breadcrumbs</h1>

					<ButtonGroup className='w-50 d-flex gap-2'>
						<Button
							color='success'
							className='rounded'
							onClick={() => this.toggleModal("alta")}
						>
							Alta
						</Button>

						<Button
							color='danger'
							className='rounded'
							disabled={!hasEnlaces}
							onClick={() => this.toggleModal("desactivar")}
						>
							Desactivar
						</Button>
					</ButtonGroup>

					<BreadcrumbList enlaces={enlaces} />
				</Card>

				<div className='mt-4'>
					<Button
						color='primary'
						className='rounded'
						onClick={() => this.toggleModal("canvas")}
					>
						Login
					</Button>

					<LoginCanvas
						isOpen={modals.canvas}
						toggle={() => this.toggleModal("canvas")}
						isLogged={isLogged}
						login={login}
						error={error}
						title={title}
						onChange={this.handleChange("login")}
						onLogin={this.handleLoginSubmit}
						onLogout={this.handleLogOut}
					/>
				</div>

				{/* MODAL ALTA */}

				<Modal isOpen={modals.alta} toggle={() => this.toggleModal("alta")}>
					<ModalHeader toggle={() => this.toggleModal("alta")}>
						Nuevo Breadcrumb
					</ModalHeader>

					<ModalBody>
						<FormField
							id='nombre'
							name='nombre'
							label='Nombre'
							type='text'
							placeholder='Ej. Google'
							value={nuevoEnlace.nombre}
							onChange={this.handleChange("nuevoEnlace")}
						/>

						<FormField
							id='url'
							name='url'
							label='URL'
							type='text'
							placeholder='https://google.com'
							value={nuevoEnlace.url}
							onChange={this.handleChange("nuevoEnlace")}
						/>
					</ModalBody>

					<ModalFooter>
						<Button color='secondary' onClick={() => this.toggleModal("alta")}>
							Cancelar
						</Button>

						<Button color='primary' onClick={this.handleStoreSubmit}>
							Guardar
						</Button>
					</ModalFooter>
				</Modal>

				{/* MODAL DESACTIVAR */}

				<Modal
					isOpen={modals.desactivar}
					toggle={() => this.toggleModal("desactivar")}
				>
					<ModalHeader toggle={() => this.toggleModal("desactivar")}>
						Desactivar Breadcrumb
					</ModalHeader>

					<ModalBody>
						<FormGroup>
							<Label for='desactivar'>Selecciona un breadcrumb</Label>

							<Input
								id='desactivar'
								type='select'
								value={idDesactivar}
								onChange={(event) =>
									this.setState({
										idDesactivar: event.target.value,
									})
								}
							>
								{enlaces.map(({ id, nombre }) => (
									<option key={id} value={id}>
										{nombre}
									</option>
								))}
							</Input>
						</FormGroup>
					</ModalBody>

					<ModalFooter>
						<Button
							color='secondary'
							onClick={() => this.toggleModal("desactivar")}
						>
							Cancelar
						</Button>

						<Button color='danger' onClick={this.handleDesactivarSubmit}>
							Desactivar
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

export default App
