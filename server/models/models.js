var Sequelize = require('../db');
var {DataTypes} = require('sequelize');

var Users = Sequelize.define('t_users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    s_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    s_hash_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    e_mail: {
        type: DataTypes.STRING,
        unique: true
    }
});

var UserToRoles = Sequelize.define('t_user_to_roles', {
    n_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    s_role: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_roles',
            key: 's_name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
});

var Roles = Sequelize.define('t_roles', {
    s_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    }
});

var GoodsTypes = Sequelize.define('t_goods_types', {
    s_name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
});

var Stockpiles = Sequelize.define('t_stockpiles', {
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

var AssembToysManufacturs = Sequelize.define('t_assemb_toys_manufacturs', {
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

var AssembToysSizes = Sequelize.define('t_assemb_toys_sizes', {
    s_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    }
});


var Goods = Sequelize.define('t_goods', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    s_type: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 't_goods_types',
            key: 's_name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    f_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});

var Basckets = Sequelize.define('t_basckets', {
    n_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    n_good: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_goods',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    n_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

var Orders = Sequelize.define('t_orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    n_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 't_users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    d_ordering_date: {
        type: DataTypes.DATE
    },
    d_ordering_date: {
        type: DataTypes.DATE
    },
});

var GoodsToOrders = Sequelize.define('t_goods_to_orders', {
    n_good: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 't_goods',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    n_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 't_orders',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    n_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

var GoodsToStockpiles = Sequelize.define('t_goods_to_stockpiles', {
    n_good: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_goods',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    s_stockpile: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 't_stockpiles',
            key: 's_name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    n_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

var AssembToys = Sequelize.define('t_assemb_toys', {
    n_articul: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 't_goods',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    s_manufactur: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 't_assemb_toys_manufacturs',
            key: 's_name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    s_model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    s_size: {
        type: DataTypes.STRING,
        references: {
            model: 't_assemb_toys_sizes',
            key: 's_name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    n_pieces: {
        type: DataTypes.INTEGER
    }
});

module.exports = {
    Users,
    UserToRoles,
    Roles,
    GoodsTypes,
    Goods,
    Basckets,
    Orders,
    GoodsToOrders,
    Stockpiles,
    GoodsToStockpiles,
    AssembToys,
    AssembToysManufacturs,
    AssembToysSizes
}