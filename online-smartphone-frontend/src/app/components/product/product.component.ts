import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList:any=[];
  brandList:any[]= [];
  productService : ProductService;
  searchedKeyword!: string;
  id:any;
  brandid:any;

  constructor(productService:ProductService, private brandService:BrandService,private activeroute: ActivatedRoute) {
    this.productService = productService;
   }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllBrand();
    this.getAllBrand();
  }

  getAllProduct(){
    this.productService.getAllProducts()
    .subscribe((response:any)=>{
      this.productList=response;
      console.log(response);
      
  },(error)=>{
    console.log(error)
  })

  
  }
  getAllBrand(){

    this.brandService.getAllBrands().subscribe((response:any)=>{
      this.brandList= response;
      console.log(response);
    })
    
  }

  getProductByBrands(id:any){
    //this.id = this.activeroute.snapshot.paramMap.get('id');
    this.productService.getProductByBrand(id).subscribe(res => this.productList = res);
  }

}
