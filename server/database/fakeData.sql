INSERT INTO users
    ( full_name, password, email, role)
values( 'سلام محمد الطنه', '$2a$10$i87h6i/XrLv7PsxfhO6dbeWNYo4le7J5PCr4oPjYTQ8N5zazveqwy', 'sallamtanna2015@gmail.com', 'architect'
);

INSERT INTO projects
    ( user_id, name, description,
    size,
    width,
    length,
    height,
    livingrooms_number,
    bathrooms_number,
    car_garage_number,
    floors_number,
    bedrooms_number,
    kitchen_description,
    rooms_description,
    garage_description,
    garden_description,
    price,
    garden_chart,
    interior_decoration_chart,
    health_chart,
    executive_cahrt,
    building_chart,
    quantity_chart,
    electricity_chart,
    conditioning_chart,
    sold
    )
VALUES
    (1, '
الخخخطة
A1002', 'test
test', 100, 100, 100, 100, 100, 100, 100, 100 , 100, 'وصف
المطبخ', 'وصف
غرف
النوم', 'وصف
كراج
السيارات', 'وصف
الحديقة', 5000, true, true, true, true, false, false, false, false, false ),
    (1, 'الخطة
A1002', 'test
test', 100, 100, 100, 100, 100, 100, 100, 100 , 100, 'وصف
المطبخ', 'وصف
غرف
النوم', 'وصف
كراج
السيارات', 'وصف
الحديقة', 5000, true, true, true, true, false, false, false, false, false ),
    (1, 'الخطة
A1002', 'test
test', 100, 100, 100, 100, 100, 100, 100, 100 , 100, 'وصف
المطبخ', 'وصف
غرف
النوم', 'وصف
كراج
السيارات', 'وصف
الحديقة', 5000, true, true, true, true, false, false, false, false, false ),
    (1, 'الخطة
A1002', 'test
test', 100, 100, 100, 100, 100, 100, 100, 100 , 100, 'وصف
المطبخ', 'وصف
غرف
النوم', 'وصف
كراج
السيارات', 'وصف
الحديقة', 5000, true, true, true, true, false, false, false, false, false ),
    (1, 'الخطة
A1002', '
test test', 100, 100, 100, 100, 100, 100, 100, 100 , 100, 'وصف المطبخ', 'وصف غرف النوم', 'وصف كراج السيارات', 'وصف الحديقة', 5000, true, true, true, true, false, false, false, false, false ),
    (1, 'الخطة A1002', 'test test', 100, 100, 100, 100, 100, 100, 100, 100 , 100, 'وصف المطبخ', 'وصف غرف النوم', 'وصف كراج السيارات', 'وصف الحديقة', 5000, true, true, true, true, false, false, false, false, false )
;

