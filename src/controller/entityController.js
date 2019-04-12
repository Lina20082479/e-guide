import entityModel from '../models/entityModel';
import movieApi from '../apis/movieImdbApi';
import museumApi from '../apis/museumApi';

const entityController = {

    getAll: (req, res, next) => {
        const searchTerms = req.query;
        const searchQuery = searchTerms.category ? { 'category': 'wit_arts' } : {};

        entityModel.find(searchQuery).populate('editor', 'first_name last_name').exec((err, entities) => {
            if (err) return res.json(err);
            res.json(entities);
        });
    },

    getOne: (req, res, next) => {
        entityModel.findById(req.params.id)
            .populate('editor', 'first_name')
            .exec((err, entity) => {
                res.json(entity || {});
            });
    },

    create: (req, res, next) => {
        entityModel.create(req.body, function (err, entity) {
            if (err) return res.json(err);
            res.json(entity)
        })
    },

    update: (req, res, next) => {
        console.log(req.params.id)

        entityModel.findOneAndUpdate({ _id: req.params.id }, req.body, (err, entity) => {
            if (err) return res.json(err);
            res.json(entity)
        });
    },

    delete: (req, res, next) => {
        entityModel.remove({ _id: req.params.id }, (err, ok) => {
            if (err) return res.json(err);
        });
        res.json(true)
    },

    search: (req, res, next) => {
        const searchTerms = req.query;

        switch (searchTerms.type) {
            case 'editor':
                entityModel.find({ 'editor': searchTerms.keywords })
                    .populate('editor', 'first_name last_name email')
                    .exec((err, editor) => {
                        if (err) return res.json(err);
                        res.json(editor);
                    });
                break;
        }
    },

    action: (req, res, next) => {
        const actionTerms = req.query;
        switch (actionTerms.type) {
            case 'saveNowPlaying':
                movieApi.getNowPlayingMovies().then(result => {
                    entityModel.remove({ category: 'movie' }, (err, ok) => {
                        result.results.map(movie => {
                            const entity = {
                                category: 'movie',
                                editor: 0,
                                object: movie
                            }
                            entityModel.create(entity);
                        });
                    });

                    res.json(result.results);
                })
                break;
            case 'saveAllArts':
                museumApi.getAllArts().then(result => {
                    console.log(result)
                    entityModel.remove({ category: 'museum' }, (err, ok) => {
                        const saveEntity = result.records.filter(art => {
                            if (art.images && art.description) {
                                return art.images.length > 0;
                            }
                        }).map(art => {
                            const entity = new entityModel();
                            entity.category = 'museum';
                            entity.editor = 0;
                            entity.object = art;
                            return entity.save();
                        });
                        Promise.all(saveEntity)
                            .then((result) => {
                                res.json(result);
                            })
                            .catch(console.error)

                    });
                })
                break;
        }
    },
};

export default entityController;