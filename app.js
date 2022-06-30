
function AddPartition(ram_size){

    size = Math.floor(Math.random() * ram_size / 2) + 2;
    // alert('ram_size: ' + ram_size + '\nsize: ' + size);

    const ram = document.getElementById('ram');

    const node = document.createElement('div')
    const node1 = document.createElement('input');
    node1.type = 'text';
    node1.value = size;
    // const partition_size = document.createTextNode(size);

    // node1.appendChild(partition_size);
    node.appendChild(node1);
    node.className = 'partition';

    ram.appendChild(node);

    return ram_size - size;
}


function UpdateType(id) {
    
    if(id == 'static') {
        document.getElementById('partitions').disabled = false;
        document.getElementById('part-size').disabled = false;
    }
    else if (id == 'dynamic') {
        document.getElementById('partitions').disabled = true;
        document.getElementById('part-size').disabled = true;

        document.getElementById('ram').innerHTML = '';
    }
}

function UpdateMemory(id) {

    ram_size = document.getElementById(id).value;
    document.getElementById('ram-size').innerHTML = ram_size;

    let max_partition = ram_size / 2;

    document.getElementById('partitions').max = max_partition;
    document.getElementById('part-max').innerHTML = max_partition;

}

function UpdatePartitions(id) {

    partitions = document.getElementById(id).value;
    document.getElementById('ram').innerHTML = '';
    ram_size = document.getElementById('ram-size').innerHTML;
    max_part_size = ram_size / 2;

    // alert(ram_size - 2);
    for(i = 0; i < partitions; i++) {
        max_part_size = AddPartition(max_part_size);
    }
}


// function updatePartition(id)

    












// COMMENTED EXTRA CODE

    // const techniqueName = document.getElementById(id).id;
    // output.style.textAlign = "right";
    // alert(output.style.backgroundColor);
    // document.getElementsByClassName('output').innerHTML = 'asdsdasd';



