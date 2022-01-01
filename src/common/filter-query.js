"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const _Initialize = require("src/database/Initialize"),
    _Initialize2 = _interopRequireDefault(_Initialize);
function _interopRequireDefault(a) {
    return a && a.__esModule ? a : { default: a };
}
exports.default = function (a) {
    const b = {};
    const searchObj = {};
    return (
        // Paginate option
        a.per_page && (b.limit = parseInt(a.per_page)),
        b.limit || (b.limit = 30),
        150 < b.limit && (b.limit = 150),
        a.page && (b.offset = b.limit * (a.page - 1)),
        // Sort option
        (b.order = []),
        a.sort &&
        ((a.sort = JSON.parse(a.sort)),
            Object.keys(a.sort).forEach(function (c) {
                console.log(a.sort[ 0 ].field);
                var d = [];
                if (-1 !== a.sort[ c ].field.indexOf(".")) {
                    var e = a.sort[ c ].field.split("."),
                        f = _Initialize2.default[ e[ 0 ] ];
                    (b.include = [ { model: f } ]),
                        (d = [
                            { model: f },
                            e[ 1 ],
                            a.sort[ c ].direction || "ASC"
                        ]);
                } else d = [ a.sort[ c ].field, a.sort[ c ].direction || "ASC" ];
                b.order.push(d);
            })),
        // Filter option
        a.filter &&
        Object.keys(a.filter).forEach(function (c) {
            if (-1 !== c.indexOf(".")) {
                var d = c.split("."),
                    e = [];
                e[ d[ 1 ] ] = a.filter[ c ];
                var f = _Initialize2.default[ d[ 0 ] ];
                (b.include = [ { model: f, where: Object.assign({}, e) } ]),
                    delete a.filter[ c ];
            }
        }),
        (b.where = Object.assign({}, a.filter)),
        // Search option
        a.search &&
        Object.keys(a.search).forEach(function (c) {
            if (-1 !== c.indexOf(".")) {
                var d = c.split("."),
                    e = [];
                e[ d[ 1 ] ] = { $like: a.search[ c ] };
                var f = _Initialize2.default[ d[ 0 ] ];
                (b.include = [ { model: f, where: Object.assign({}, e) } ]);
            } else {
                searchObj[ c ] = { $like: `%${a.search[ c ]}%` };
            }
            delete a.search[ c ];
        }),
        (b.where = Object.assign({}, searchObj)),
        // Timestamps option
        (a.created_since || a.created_before) &&
        ((b.where.created_at = {}),
            a.created_since && (b.where.created_at.$gt = a.created_since),
            a.created_before && (b.where.created_at.$lt = a.created_before)),
        (a.updated_since || a.updated_before) &&
        ((b.where.updated_at = {}),
            a.updated_since && (b.where.updated_at.$gt = a.updated_since),
            a.updated_before && (b.where.updated_at.$lt = a.updated_before)),
        {} == b.where && delete b.where,
        b
    );
};
