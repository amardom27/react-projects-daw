import { Card, CardBody, CardTitle, CardImg, CardText } from "reactstrap"

export const Flashcard = ({ nombre, imgSrc, texto }) => {
    return (
        <Card
            style={{
                width: '18rem',
                margin: "1rem"
            }}
        >
            <CardImg top width="100%" src={imgSrc} />
            <CardBody>
                <CardTitle tag="h5">
                    {nombre}
                </CardTitle>
                <CardText>
                    {texto}
                </CardText>
            </CardBody>
        </Card>
    )
}