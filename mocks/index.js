const Mock = require('mockjs');

const CODE_SUCCESS = 200;

module.exports = (app) => {
  app.get('/mock/user/info', (req, res) => {
    const json = Mock.mock({
      code: CODE_SUCCESS,
      data: {
        id: '@id',
        name: '@word',
        description: '@sentence',
        created_at: '@time(yyyy-MM-dd HH:mm:ss)',
        updated_at: '@time(yyyy-MM-dd HH:mm:ss)',
        avatar: '@image(100, #FF6600)',
      },
    });

    res.json(json);
  });

  app.get('/mock/user/list', (req, res) => {
    const json = Mock.mock({
      code: CODE_SUCCESS,
      data: {
        'list|10': [
          {
            id: '@id',
            name: '@word',
            description: '@sentence',
            created_at: '@time(yyyy-MM-dd HH:mm:ss)',
            updated_at: '@time(yyyy-MM-dd HH:mm:ss)',
            avatar: '@image(100, #FF6600)',
          },
        ],
      },
    });

    res.json(json);
  });
};
