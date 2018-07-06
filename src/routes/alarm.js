const popup = require('window-popup').windowPopup;

module.exports = app => {
    app.get('/fencedata', (req, res) =>{
        console.log(req.query);
        var ne_x = req.query.ne_x;
        var ne_y = req.query.ne_y;
        var sw_x = req.query.sw_x;
        var sw_y = req.query.sw_y;

        req.session.ne_x = ne_x;
        req.session.ne_y = ne_y;
        req.session.sw_x = sw_x;
        req.session.sw_y = sw_y;

        console.log('ne_x: '+req.session.ne_x+', ne_y: '+req.session.ne_y+', sw_x: '+req.session.sw_x+', sw_y: '+req.session.sw_y);
        console.log(req.session);
        res.json({'message': 'success'});
    });

    app.get('/isChildIn', (req, res) => {
        if(!req.session.username === req.query.username)
            res.redirect('/');
        var child_x = req.query.childX; //126정도 값
        var child_y = req.query.childY; //37정도 값

        console.log(req.session.ne_x+', '+req.session.ne_y+', '+req.session.sw_x+', '+req.session.sw_y+', '+req.session.username);
        if(child_x < req.session.sw_x || child_x > req.session.ne_x || child_y < req.session.sw_y || child_y > req.session.ne_y) {
            //알람
            res.json({message: 'child is outofBounds'})
        }
        res.json({message: 'child is inBounds'});
    });

    app.get('/userroute', (req, res) => {
        var x = req.query.pos_x;
        var y = req.query.pos_y;

        if(!req.session.child_pos) {
            req.session.child_pos = new Array();
        }

        req.session.child_pos.push(new Object(x, y));
        console.log(req.session.child_pos);
    }); 

    app.get('/outofBound', (req, res) => {
        res.render('outofBound.ejs');
    })
}