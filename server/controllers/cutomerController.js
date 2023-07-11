const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const message = req.flash('info');
  const locals = {
    title: 'NodeJs',
    description: 'NodeJs User Management System by harsh',
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { updateAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Customer.count();

    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      message,
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.homepage = async (req, res) => {
//   const message = req.flash('info');
//   //Home
//   const locals = {
//     title: 'NodeJs',
//     description: 'NodeJs User Management System by harsh',
//   };

//   try {
//     const customers = await Customer.find({}).limit(22);
//     res.render('index', {
//       locals,
//       message,
//       customers,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

/**
 * GET
 * New Customer Form
 */

exports.addCustomer = async (req, res) => {
  //Home
  const locals = {
    title: 'Add New Customer - NodeJS',
    description: 'NodeJs User Management System by harsh',
  };

  res.render('customer/add', locals);
};

/**
 * POST
 * Create New Customer
 */

exports.postCustomer = async (req, res) => {
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });
  // console.log(req.body);

  // const locals = {
  //   title: 'New Customer Added!',
  //   description: 'NodeJs User Management System by harsh',
  // };

  try {
    await Customer.create(newCustomer);
    await req.flash('info', 'New Customer has been added.');
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};
