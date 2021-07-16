var sequelize = require('../db');
var {DataTypes} = require('sequelize');

var users = sequelize.define('t_users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    s_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    s_hash_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    s_salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    e_mail: {
        type: DataTypes.STRING
    }
});

var user_to_roles = sequelize.define('t_user_to_roles', {
    n_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_users',
            key: 'id'
        }
    },
    s_role: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_roles',
            key: 's_name'
        }
    }
});

var roles = sequelize.define('t_roles', {
    s_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    s_write: {
        type: DataTypes.BOOLEAN
    },
    s_read: {
        type: DataTypes.BOOLEAN
    },
    s_update: {
        type: DataTypes.BOOLEAN
    },
});

var goods_types = sequelize.define('t_goods_types', {
    s_name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
});

var stockpiles = sequelize.define('t_stockpiles', {
    s_name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    s_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    s_phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

var assemb_toys_manufacturs = sequelize.define('t_assemb_toys_manufacturs', {
    s_name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    s_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    s_phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

var assemb_toys_sizes = sequelize.define('t_assemb_toys_sizes', {
    s_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    }
});


var goods = sequelize.define('t_goods', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    s_type: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 't_goods_types',
            key: 's_name'
        }
    },
    f_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});

var basckets = sequelize.define('t_basckets', {
    n_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_users',
            key: 'id'
        }
    },
    n_good: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_goods',
            key: 'id'
        }
    },
    n_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

var orders = sequelize.define('t_orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    n_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 't_users',
            key: 'id'
        }
    },
    d_ordering_date: {
        type: DataTypes.BOOLEAN
    },
    d_ordering_date: {
        type: DataTypes.BOOLEAN
    },
});

var goods_to_orders = sequelize.define('t_goods_to_orders', {
    n_good: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 't_goods',
            key: 'id'
        }
    },
    n_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 't_orders',
            key: 'id'
        }
    },
    n_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

var goods_to_stockpiles = sequelize.define('t_goods_to_stockpiles', {
    n_good: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_goods',
            key: 'id'
        }
    },
    s_stockpile: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_stockpiles',
            key: 's_name'
        }
    },
    n_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

var assemb_toys = sequelize.define('t_assemb_toys', {
    s_manufactur: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_assemb_toys_manufacturs',
            key: 's_name'
        }
    },
    s_model: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    n_articul: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_goods',
            key: 'id'
        }
    },
    s_size: {
        type: DataTypes.STRING,
        references: {
            model: 't_assemb_toys_sizes',
            key: 's_name'
        }
    },
    n_pieces: {
        type: DataTypes.INTEGER
    }
});

module.exports = {
    users,
    user_to_roles,
    roles,
    goods_types,
    goods,
    basckets,
    orders,
    goods_to_orders,
    stockpiles,
    goods_to_stockpiles,
    assemb_toys,
    assemb_toys_manufacturs,
    assemb_toys_sizes
}