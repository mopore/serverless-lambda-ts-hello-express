import { Express, response } from "express";
import Joi from "@hapi/joi";

type Course = { 
    id: number,
    name: string
};

let courses: Course[] = [
    { id:1, name: 'Course 1'},
    { id:2, name: 'Course 2'},
    { id:2, name: 'Course 3'},
];


export class CourseSample {
    static applySample( app: Express ){

        app.get('/api/courses', ( req, resp ) => {
            resp.send( courses );
        } );
        

        app.get('/api/courses/:id', ( req, resp ) => {
            const course = courses.find( c => c.id === parseInt(req.params['id']));
            if ( !course ) resp.status(404).send(' The course could not be found');
            resp.send( course );
        });


        // Call with with a post request and JSON like the following
        // {
        // "id": 4,
        // "name": "Helmut"
        // }
        app.post('/api/courses', ( req, resp ) => {
            const schema = Joi.object( {
                id: Joi.number().required(),
                name: Joi.string().min(3).required()
            });
            const { error } = schema.validate( req.body );
            if ( error ) return resp.status(400).send( error.details[0].message );

            const course = req.body as Course;
            courses = [...courses, course]; 
            resp.send( course );
        });

        // Call with http://localhost/api/posts/2020/09?sortBy=name
        app.get('/api/posts/:year/:month',  ( req, resp ) => {

            const year = req.params['year'];
            const month = req.params['month'];
            const sortCriteria = req.query['sortBy'];

            const response = `Year: ${year}, month: ${month}, sortBy: ${sortCriteria}`;
            resp.send( response );
        } )

    }
}