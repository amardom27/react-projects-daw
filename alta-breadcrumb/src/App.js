import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"
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
const FormField = ({ id, label, ...props }) => (
	<FormGroup>
		<Label for={id}>{label}</Label>

		<Input id={id} {...props} />
	</FormGroup>
)

const BreadcrumbList = ({ enlaces }) => (
	<Breadcrumb>
		{enlaces.map(({ id, nombre, url }) => (
			<BreadcrumbItem key={id}>
				<a href={url}>{nombre}</a>
			</BreadcrumbItem>
		))}
	</Breadcrumb>
)

const LoginCanvas = ({
	isOpen,
	toggle,
	isLogged,
	login,
	error,
	title,
	onChange,
	onLogin,
	onLogout,
}) => (
	<Offcanvas isOpen={isOpen} toggle={toggle}>
		<OffcanvasHeader toggle={toggle}>
			{isLogged ? title : "Login"}
		</OffcanvasHeader>

		<OffcanvasBody>
			{isLogged ? (
				<Button
					color='danger'
					className='rounded w-100'
					onClick={onLogout}
				>
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

					<Button
						color='primary'
						className='rounded'
						onClick={onLogin}
					>
						Login
					</Button>
				</Card>
			)}
		</OffcanvasBody>
	</Offcanvas>
)

function App() {
	// STATES
	const [enlaces, setEnlaces] = useState([])
	const [modals, setModals] = useState({
		alta: false,
		desactivar: false,
		canvas: false,
	})
	const [nuevoEnlace, setNuevoEnlace] = useState(INITIAL_ENLACE)
	const [idDesactivar, setIdDesactivar] = useState("")
	const [login, setLogin] = useState(INITIAL_LOGIN)
	const [title, setTitle] = useState(null)
	const [error, setError] = useState(null)

	// DERIVED STATE
	const isLogged = Boolean(title)
	const hasEnlaces = enlaces.length > 0

	// HELPERS
	const toggleModal = (modal) => {
		setModals((prev) => ({
			...prev,
			[modal]: !prev[modal],
		}))
	}

	const handleChange = (setter) => (event) => {
		const { name, value } = event.target

		setter((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleNuevoEnlaceChange = handleChange(setNuevoEnlace)

	const handleLoginChange = handleChange(setLogin)

	const getNextId = () => {
		if (enlaces.length === 0) {
			return 1
		}

		return enlaces[enlaces.length - 1].id + 1
	}

	// API
	const fetchEnlaces = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/enlaces.php`)

			setEnlaces(res.data)

			if (res.data.length > 0) {
				setIdDesactivar(res.data[0].id)
			}
		} catch (error) {
			console.error("Error cargando enlaces:", error)
		}
	}

	useEffect(() => {
		fetchEnlaces()
	}, [])

	// ACTIONS
	const handleStoreSubmit = () => {
		const enlace = {
			id: getNextId(),
			...nuevoEnlace,
		}

		setEnlaces((prev) => [...prev, enlace])
		setNuevoEnlace(INITIAL_ENLACE)
		setIdDesactivar(enlace.id)
		toggleModal("alta")
	}

	const handleDesactivarSubmit = () => {
		const nuevosEnlaces = enlaces.filter(
			(enlace) => enlace.id !== +idDesactivar,
		)

		setEnlaces(nuevosEnlaces)
		setIdDesactivar(nuevosEnlaces[0]?.id || "")
		toggleModal("desactivar")
	}

	const handleLoginSubmit = async () => {
		try {
			const res = await axios.post(
				`${BASE_URL}/nuevos-usuarios.php`,
				login,
			)

			setTitle(res.data.offcavas)
			setEnlaces(res.data.enlaces)
			setError(null)
		} catch (error) {
			setError(error.response.data.error)
		}
	}

	const handleLogOut = () => {
		fetchEnlaces()

		setLogin(INITIAL_LOGIN)
		setTitle(null)
		setError(null)
	}

	// JSX
	return (
		<div className='App p-5'>
			<Card className='p-4 d-flex gap-3'>
				<h1>Menú con Reactstrap Breadcrumbs</h1>

				<ButtonGroup className='w-50 d-flex gap-2'>
					<Button
						color='success'
						className='rounded'
						onClick={() => toggleModal("alta")}
					>
						Alta
					</Button>

					<Button
						color='danger'
						className='rounded'
						disabled={!hasEnlaces}
						onClick={() => toggleModal("desactivar")}
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
					onClick={() => toggleModal("canvas")}
				>
					Login
				</Button>

				<LoginCanvas
					isOpen={modals.canvas}
					toggle={() => toggleModal("canvas")}
					isLogged={isLogged}
					login={login}
					error={error}
					title={title}
					onChange={handleLoginChange}
					onLogin={handleLoginSubmit}
					onLogout={handleLogOut}
				/>
			</div>

			{/* MODAL ALTA */}

			<Modal isOpen={modals.alta} toggle={() => toggleModal("alta")}>
				<ModalHeader toggle={() => toggleModal("alta")}>
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
						onChange={handleNuevoEnlaceChange}
					/>

					<FormField
						id='url'
						name='url'
						label='URL'
						type='text'
						placeholder='https://google.com'
						value={nuevoEnlace.url}
						onChange={handleNuevoEnlaceChange}
					/>
				</ModalBody>

				<ModalFooter>
					<Button
						color='secondary'
						onClick={() => toggleModal("alta")}
					>
						Cancelar
					</Button>

					<Button color='primary' onClick={handleStoreSubmit}>
						Guardar
					</Button>
				</ModalFooter>
			</Modal>

			{/* MODAL DESACTIVAR */}

			<Modal
				isOpen={modals.desactivar}
				toggle={() => toggleModal("desactivar")}
			>
				<ModalHeader toggle={() => toggleModal("desactivar")}>
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
								setIdDesactivar(event.target.value)
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
						onClick={() => toggleModal("desactivar")}
					>
						Cancelar
					</Button>

					<Button color='danger' onClick={handleDesactivarSubmit}>
						Desactivar
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}

export default App
