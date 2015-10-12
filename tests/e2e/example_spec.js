describe('my app', function() {

    beforeEach(function () {   
      browser.get('index.html');
      //browser.waitForAngular();
    });


   it('Should get the correct title', function() {
      var title = browser.getTitle();
      expect(title).toEqual('Search your CAR');
    }); 


   it('Should get the correct values in the drop downs', function() {

      var make = element(by.model('make'));
      var selectedMake = element(by.css('option[value="Toyota"]'));

      make.click();

      expect(selectedMake).toBeTruthy();
      selectedMake.click();

      expect(make.getAttribute('value')).toEqual('Toyota');

      var model = element(by.model('model'));
      var selectedModel = element(by.css('option[value="Camry"]'));
    
      model.click();

      expect(selectedModel).toBeTruthy();
      selectedModel.click();
    
      expect(model.getAttribute('value')).toEqual('Camry');

      var year = element(by.model('year'));
      var selectedYear = element(by.css('option[value="2014"]'));
    
      year.click();

      expect(selectedYear).toBeTruthy();
      selectedYear.click();
    
      expect(year.getAttribute('value')).toEqual('2014');


    }); 


 });   

   