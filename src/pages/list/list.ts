import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { getRepository, Repository } from 'typeorm';

import { Category } from './../../entities/category';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private loadedCategories: boolean = false;
  private loadedCategory: Category = null;

  selectedItem: any;
  categories: Category[];
  sampleCategories: Array<string> = ['Geschichte im Überblick', 'Philosophie'];
  sampleCategory: string = 'Geschichte im Überblick';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad() {
    this.runDemo();
  }

  async runDemo() {

    // this.sampleCategories.forEach(name => {
      let newCategory = new Category();
      newCategory.name = this.sampleCategory;
      // newCategory.name = name;
    // });

    const categoryRepository = getRepository('category') as Repository<Category>;
    await categoryRepository.save(newCategory);

    console.log('Category has been saved');

    const loadedCatgory = await categoryRepository.createQueryBuilder('category')
      .where('category.id = :id', {id: newCategory.id})
      .getOne();
  }
}
