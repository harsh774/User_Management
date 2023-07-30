const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const message = req.flash('info');
  const locals = {
    title: 'NodeJs User Management System',
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

exports.hero = async (req, res) => {
  //Hero
  const locals = {
    title: 'Who we are? ~ Node.JS User Management System',
    description: 'NodeJs User Management System by harsh',
  };

  try {
    res.render('hero', locals);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * About
 */

exports.about = async (req, res) => {
  //About
  const locals = {
    title: 'About Us',
    description: 'NodeJs User Management System by harsh',
  };

  try {
    res.render('about', locals);
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

/**
 * GET/
 * Customer data
 */
exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: 'Details of Customer',
      description: 'NodeJs User Management System by harsh',
    };

    res.render('customer/view', { locals, customer });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET/
 * Edit Customer data
 */
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: 'Edit details of Customer',
      description: 'NodeJs User Management System by harsh',
    };

    // await req.flash('info', 'Details has been updated successfully.');
    res.render('customer/edit', { locals, customer });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET/
 * Update Customer data
 */
exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });

    await req.flash('info', 'Details has been updated successfully.');
    await res.redirect(`/edit/${req.params.id}`);

    console.log('redirected');
  } catch (error) {
    console.log(error + 'harsh');
  }
};

/**
 * DELETE/
 * Delete Customer data
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    await req.flash('info', 'A user record has been deleted');
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET/
 * Search Customer data
 */
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: 'Search details of Customer',
    description: 'NodeJs User Management System by harsh',
  };
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ],
    });

    res.render('search', {
      customers,
      locals,
    });
  } catch (error) {}
};
