import usersController from './controller/usersController';
import authController from './controller/authController';
import entityController from './controller/entityController';
import authenticated from './middlewares/authenticated';

const routes = (route) => {
    route.get('/', (req, res) => {
        res.send(`Api server (${new Date()})`);
    });

    route.route('/login')
        .post(authController.login);

    route.route('/register')
        .post(authController.register);

    route.route('/users')
        .get(usersController.getAll)
        .post(usersController.create);

    route.route('/users/:id')
        .get(usersController.getOne)
        .put(usersController.update)
        .delete(usersController.delete)

    route.route('/entities')
        .get(entityController.getAll)
        .post(entityController.create);

    route.route('/entities/:id')
        .get(entityController.getOne)
        .put(entityController.update)
        .delete(entityController.delete)

    route.route('/entity-search')
        .get(entityController.search)

    route.route('/entities-action')
        .get(entityController.action)
};

export default routes;
